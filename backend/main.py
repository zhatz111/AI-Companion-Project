# Standard Imports
import secrets
import hashlib
import traceback
from typing import Optional, List, Annotated
from datetime import datetime, timedelta, timezone

# Third Party Imports
from bson import ObjectId
from pydantic import EmailStr
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import (
    FastAPI,
    HTTPException,
    status,
    UploadFile,
    Depends,
    Body,
    Query,
    Form,
    File,
)

# Local Imports
# pylint: disable=import-error
from templates.email_templates import (
    send_reset_email,
    send_verify_email,
    send_feedback_confirmation,
)
from schemas.schema import (
    User,
    UserInDB,
    Token,
    Conversation,
    Message,
    ResetPassword,
    FeedbackForm,
)
from core.utility_functions import (
    hash_password,
    verify_password,
    create_access_token,
    create_refresh_token,
    validate_access_token,
    validate_refresh_token,
    get_user,
    get_current_user,
    oauth2_scheme,
)
from core.database import (
    users_collection,
    conversations_collection,
    messages_collection,
    password_resets_collection,
    feedback_collection,
    s3_client,
    BUCKET_NAME,
    open_AI_client,
)


# -----------------------------------------------------------------


# FASTAPI APP WITH ENDPOINTS
app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://192.168.1.169:3000",
]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Update with your frontend domain if possible for security
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# ROUTES


@app.post("/api/register", response_model=Token)
async def register(user: User):

    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")

    if users_collection.find_one({"username": user.username}):
        raise HTTPException(status_code=400, detail="Username already registered")

    if user.password != user.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match!")

    hashed_password = hash_password(user.password)

    new_user = {**user.model_dump(), "hashed_password": hashed_password}
    del new_user["password"]
    del new_user["confirmed_password"]

    new_user["enabled"] = True
    new_user["signed_up"] = datetime.now(timezone.utc)
    new_user["last_login"] = datetime.now(timezone.utc)
    new_user["confirmed_email"] = True

    print(new_user)

    users_collection.insert_one(new_user)
    access_token = create_access_token(data={"sub": user.email})  # Use email in token
    verification_token = create_access_token(
        data={"sub": user.email}, expires_delta=15
    )  # Use email in token

    await send_verify_email(user.email, verification_token)

    return {"access_token": access_token, "token_type": "bearer"}


@app.post("/api/verify-email", response_model=UserInDB)
async def verify_email(
    token: Annotated[str, Form()],
):
    try:
        # Validate the token and extract the payload
        payload = validate_access_token(token=token)
        if "sub" not in payload or not payload["sub"]:
            raise HTTPException(status_code=400, detail="Invalid token payload")

        email = payload["sub"]

        # Find the user by email
        user = users_collection.find_one({"email": email})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # Update the user's email verification status
        updated_user = users_collection.find_one_and_update(
            {"email": email},
            {"$set": {"confirmed_email": True}},
        )

        if not updated_user:
            raise HTTPException(
                status_code=500, detail="Failed to update user verification status"
            )

        return UserInDB(**updated_user)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@app.post("/api/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = get_user(form_data.username)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    if not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    users_collection.find_one_and_update(
        {"email": user.email}, {"$set": {"last_login": datetime.now(timezone.utc)}}
    )

    access_token = create_access_token(data={"sub": user.email})
    refresh_token = create_refresh_token(data={"sub": user.email})

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
    }


@app.get("/api/user", response_model=UserInDB)
async def get_user_data(current_user: UserInDB = Depends(get_current_user)):
    """
    Fetch the current user's data.
    """
    user_data = users_collection.find_one({"email": current_user.email})
    print(current_user.email)
    if not user_data:
        raise HTTPException(status_code=404, detail="User not found")
    user_data["hashed_password"] = ""
    return UserInDB(**user_data)  # Return user data (excluding hashed_password)


@app.post("/api/conversations", response_model=Conversation)
async def create_conversation(
    user: UserInDB = Depends(get_current_user), ai_character: str = Body(...)
):
    """
    Create a new conversation with specified participants.
    """
    conversation = {
        "email": user.email,
        "ai_character": ai_character,
        "created_at": datetime.now(timezone.utc),
    }
    print(conversation)
    result = conversations_collection.insert_one(dict(conversation))
    conversation["id"] = str(result.inserted_id)
    return Conversation(**conversation)


@app.get("/api/conversations", response_model=List[Conversation])
async def list_conversations(user: UserInDB = Depends(get_current_user)):
    """
    List all conversations for a specific participant.
    """
    conversations = conversations_collection.find({"email": user.email}).sort(
        "created_at", -1
    )
    for conversation in conversations:
        conversation["id"] = str(conversation["_id"])
    return [Conversation(**conv) for conv in conversations]


@app.get("/api/check_conversation", response_model=List[Conversation])
async def check_conversation(
    user: UserInDB = Depends(get_current_user), ai_character: str = Query(...)
):
    """
    Check if a conversation exists for a specific user and AI character.
    """
    conversations = conversations_collection.find(
        {
            "email": user.email,
            "ai_character": ai_character,
        }
    ).sort("created_at", -1)

    # Convert MongoDB cursor to a list
    conversations_list = list(conversations)

    if not conversations_list:
        # Return a 404 response if no conversation is found
        raise HTTPException(status_code=404, detail="Conversations not found")

    # Convert MongoDB ObjectId to string and construct Conversation objects
    return [
        Conversation(**{**conv, "id": str(conv["_id"])}) for conv in conversations_list
    ]


@app.post("/api/messages", response_model=Message)
async def send_message(
    sender: UserInDB = Depends(get_current_user),
    conversation_id: str = Body(...),
    content: str = Body(...),
):
    """
    Send a message in a specific conversation.
    """
    # Check if conversation exists
    conversation = conversations_collection.find_one({"_id": ObjectId(conversation_id)})
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")

    message = {
        "sender": sender.username,
        "role": "user",
        "content": content,
        "time_created": datetime.now(timezone.utc),
        "conversation_id": conversation_id,
    }
    result = messages_collection.insert_one(message)
    message["id"] = str(result.inserted_id)
    return Message(**message)


@app.get("/api/messages/{conversation_id}", response_model=List[Message])
async def get_messages(
    conversation_id: str,
    skip: int = Query(0, ge=0),  # Pagination
    limit: int = Query(10, ge=1),  # Pagination
):
    """
    Retrieve all messages in a specific conversation.
    """
    # even if no messages return empty list for frontend
    messages = list(
        messages_collection.find({"conversation_id": conversation_id})
        .sort("time_created", 1)
        .skip(skip)
        .limit(limit)
    )
    for message in messages:
        message["id"] = str(message["_id"])

    return [Message(**msg) for msg in messages]


@app.post("/generate-response", response_model=Message)
async def generate_response(
    content: list = Body(...),
    conversation_id: str = Body(...),
    ai_character: str = Body(...),
    system_prompt: str = Body(...),
    _: str = Depends(get_current_user),
):
    """_summary_

    Args:
        content (str, optional): _description_. Defaults to Body(...).
        conversation_id (str, optional): _description_. Defaults to Body(...).
        ai_character (str, optional): _description_. Defaults to Body(...).

    Raises:
        HTTPException: _description_

    Returns:
        _type_: _description_
    """
    try:
        system_prompt = [
            {"role": "system", "content": system_prompt}
        ]  # System message setting context
        extracted_messages = [
            {"role": message["role"], "content": message["content"]}
            for message in content
        ]  # "content": {"type": "text", "text": message["content"]}
        message_list = system_prompt + extracted_messages
        print(message_list)

        completion = open_AI_client.chat.completions.create(
            model="NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO",  # "mistralai/Mistral-Nemo-Instruct-2407", "mistralai/Mixtral-8x7B-Instruct-v0.1-fast"
            messages=message_list,
            temperature=0.4,
            max_tokens=512,
            top_p=0.1,
        )

        # Parse the response JSON
        response_dict = completion.to_dict()
        print(response_dict)

        # Create the AI-generated message
        ai_message = {
            "sender": ai_character,
            "role": "assistant",
            "content": response_dict["choices"][0]["message"]["content"],
            "time_created": datetime.now(timezone.utc),
            "conversation_id": conversation_id,
        }

        # Store message in database
        result = messages_collection.insert_one(ai_message)
        ai_message["id"] = str(result.inserted_id)
        return Message(**ai_message)

    except Exception as e:
        # Handle potential errors
        print(traceback.format_exc())
        raise HTTPException(
            status_code=500, detail=f"Error generating response: {str(e)}"
        ) from e


@app.post("/api/forgot-password", response_model=ResetPassword)
async def forgot_password(email: Annotated[str, Form()]):
    user = users_collection.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Calculate the time window for the last 48 hours
    now = datetime.now(timezone.utc)
    time_window_start = now - timedelta(hours=48)

    # Check the number of resets in the last 48 hours
    recent_resets_count = password_resets_collection.count_documents(
        {"email": email, "reset_time": {"$gte": time_window_start}}
    )

    if recent_resets_count >= 3:
        raise HTTPException(
            status_code=429,  # Too Many Requests
            detail="Too many password reset requests in the last 48 hours. Please try again later.",
        )

    # Generate a secure token and save it with an expiry
    token = secrets.token_urlsafe(32)
    reset_data = {
        "email": email,
        "hashed_token": token,
        "expiration_time": now + timedelta(hours=1),
        "reset_time": now,
    }
    password_resets_collection.insert_one(reset_data)

    # Send the token via email
    await send_reset_email(user["username"], email, token)

    return ResetPassword(**reset_data)


@app.post("/api/reset-password", response_model=UserInDB)
async def reset_password(
    new_password: Annotated[str, Form()],
    confirm_new_password: Annotated[str, Form()],
    token: Annotated[str, Form()],
):
    hashed_token = hash_password(token)

    if new_password != confirm_new_password:
        raise HTTPException(
            status_code=401,
            detail="Confirmed password does not match original password",
        )

    # Validate the token
    reset_request = password_resets_collection.find_one({"hashed_token": token})
    if not reset_request:
        raise HTTPException(status_code=404, detail="Password reset request not found")

    # Retrieve the datetime object (assuming it is offset-naive)
    expiration_time = reset_request["expiration_time"]

    # Attach the UTC timezone
    expiration_time = expiration_time.replace(tzinfo=timezone.utc)

    if expiration_time < datetime.now(timezone.utc):
        password_resets_collection.find_one_and_update(
            {"hashed_token": token}, {"$set": {"hashed_token": hashed_token}}
        )
        raise HTTPException(status_code=400, detail="Reset Request has expired")

    email = reset_request["email"]

    # Reset the user's password
    user = users_collection.find_one({"email": email})
    if not user:
        password_resets_collection.find_one_and_update(
            {"hashed_token": token}, {"$set": {"hashed_token": hashed_token}}
        )
        raise HTTPException(status_code=404, detail="User not found")

    # Hash the token after resetting the password
    password_resets_collection.find_one_and_update(
        {"hashed_token": token}, {"$set": {"hashed_token": hashed_token}}
    )

    hashed_password = hash_password(new_password)
    users_collection.find_one_and_update(
        {"email": email}, {"$set": {"hashed_password": hashed_password}}
    )

    return UserInDB(**user)


@app.post("/api/contact-us", response_model=FeedbackForm)
async def contact_us(
    email: Annotated[EmailStr, Form()],
    subject: Annotated[str, Form()],
    message: Annotated[str, Form()],
):
    valid = False
    user = users_collection.find_one({"email": email})
    if user:
        valid = True

    feedback = {
        "email": email,
        "subject": subject,
        "message": message,
        "valid_user": valid,
        "feedback_time": datetime.now(timezone.utc),
    }

    feedback_collection.insert_one(feedback)

    await send_feedback_confirmation(email)

    return FeedbackForm(**feedback)


@app.post("/api/token/validate")
async def validate_token_endpoint(token: str = Depends(oauth2_scheme)):
    """
    Endpoint to validate an access token.
    Returns the decoded payload if the token is valid.
    """
    try:
        payload = validate_access_token(token)  # Validate the token
        return {"message": "Token is valid", "payload": payload}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token"
        ) from e


@app.post("/api/refresh")
async def refresh_token_validation(refresh_token: str = Depends(oauth2_scheme)):
    """
    Endpoint to validate and refresh the access token using the refresh token.
    """
    if not refresh_token:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Refresh token missing"
        )

    # Validate the refresh token (you may need to implement validate_refresh_token)
    try:
        payload = validate_refresh_token(
            refresh_token
        )  # Assuming this function validates the refresh token
        # Create a new access token
        new_access_token = create_access_token(data={"sub": payload["sub"]})

        return {"access_token": new_access_token}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token",
        ) from e


@app.post("/api/change-user-info", response_model=UserInDB)
async def change_user_info(
    username: Optional[str] = Body(None),
    email: Optional[EmailStr] = Body(None),
    password: Optional[str] = Body(None),
    user: UserInDB = Depends(get_current_user),
):

    if not any([username, email, password]):
        raise HTTPException(
            status_code=400, detail="At least one field must be provided."
        )

    update_fields = {}

    if username and username != user.username:
        update_fields["username"] = username

    if email and email != user.email:
        # Query the database to check if the email already exists
        existing_user = users_collection.find_one({"email": email})
        if existing_user:
            raise HTTPException(
                status_code=409, detail="Email is already in use by another user."
            )
        update_fields["email"] = email

    if password:
        update_fields["hashed_password"] = hash_password(password)

    if not update_fields:
        raise HTTPException(
            status_code=400,
            detail="No valid updates provided. Check that new values are different from existing ones.",
        )

    try:
        result = users_collection.find_one_and_update(
            {"email": user.email},
            {"$set": update_fields},
            return_document=True,  # Return the updated document
        )

        if not result:
            raise HTTPException(
                status_code=404, detail="User not found. Update operation failed."
            )

        # Convert the result back into a UserInDB object
        result["hashed_password"] = ""
        updated_user = UserInDB(**result)
        return updated_user

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}"
        ) from e


@app.post("/api/update-personal-info", response_model=UserInDB)
async def change_personal_info(
    age: Optional[int] = Body(None),
    height_feet: Optional[int] = Body(None),
    height_inches: Optional[int] = Body(None),
    weight: Optional[int] = Body(None),
    gender: Optional[str] = Body(None),
    identity: Optional[str] = Body(None),
    sexuality: Optional[str] = Body(None),
    politics: Optional[str] = Body(None),
    user: UserInDB = Depends(get_current_user),
):
    # Check if at least one personal field is provided
    if not any(
        [
            age,
            height_feet,
            height_inches
            is not None,  # Explicitly check if height_inches is not None, allowing 0,
            weight,
            gender,
            identity,
            sexuality,
            politics,
        ]
    ):
        raise HTTPException(
            status_code=400, detail="At least one personal field must be provided."
        )

    # Prepare the fields that will be updated
    update_fields = {}

    if age is not None:
        update_fields["age"] = age

    if height_feet is not None:
        update_fields["height_feet"] = height_feet

    if height_inches is not None:
        update_fields["height_inches"] = height_inches

    if weight is not None:
        update_fields["weight"] = weight

    if gender is not None:
        update_fields["gender"] = gender

    if identity is not None:
        update_fields["identity"] = identity

    if sexuality is not None:
        update_fields["sexuality"] = sexuality

    if politics is not None:
        update_fields["politics"] = politics

    # Check if any field needs to be updated
    if not update_fields:
        raise HTTPException(
            status_code=400,
            detail="No valid updates provided. Check that new values are different from existing ones.",
        )

    try:
        # Update the user's document in the database
        result = users_collection.find_one_and_update(
            {"email": user.email},  # Find the user by email
            {"$set": update_fields},  # Set the fields to be updated
            return_document=True,  # Return the updated document
        )

        # If no user is found, raise an error
        if not result:
            raise HTTPException(
                status_code=404, detail="User not found. Update operation failed."
            )

        # Convert the result back into a UserInDB object
        result["hashed_password"] = ""  # Clear the hashed_password for security
        updated_user = UserInDB(**result)
        return updated_user

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}"
        ) from e


@app.delete("/api/delete-chat/{conversation_id}")
async def delete_chat(conversation_id: str, _: UserInDB = Depends(get_current_user)):
    try:
        # Ensure the conversation_id is a valid ObjectId
        if not ObjectId.is_valid(conversation_id):
            raise HTTPException(status_code=400, detail="Invalid conversation ID format")

        # Delete the conversation
        result = conversations_collection.delete_one({"_id": ObjectId(conversation_id)})

        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Conversation not found")

        # Return a success message
        return {"message": "Chat deleted successfully!"}

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}"
        ) from e


@app.delete("/api/delete-chats")
async def delete_chats(user: UserInDB = Depends(get_current_user)):

    try:
        # Fetch all conversations for the current user by username
        conversations = list(conversations_collection.find({"email": user.email}))

        # Check if there are any conversations to delete
        if not conversations:
            raise HTTPException(
                status_code=404, detail="No conversations found for this user."
            )

        # Extract conversation IDs to delete associated messages and conversations
        conversations_ids = [str(conversation["_id"]) for conversation in conversations]

        # Delete all messages related to these conversations
        result_messages = messages_collection.delete_many(
            {"conversation_id": {"$in": conversations_ids}}
        )

        # Delete the conversations
        result_conversations = conversations_collection.delete_many(
            {"email": user.email}
        )

        # Check how many documents were deleted
        if (
            result_messages.deleted_count == 0
            and result_conversations.deleted_count == 0
        ):
            raise HTTPException(
                status_code=500, detail="No conversations or chats to delete."
            )

        # Return a success message with counts of deleted items
        return {
            "message": "Chats deleted successfully",
            "deleted_conversations_count": result_conversations.deleted_count,
            "deleted_messages_count": result_messages.deleted_count,
        }

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}"
        ) from e


@app.delete("/api/delete-account")
async def delete_account(user: UserInDB = Depends(get_current_user)):

    print(user)
    try:
        # Check if the user has any conversations
        conversations = list(conversations_collection.find({"email": user.email}))
        print(conversations)

        if conversations:
            # Extract conversation IDs to delete associated messages and conversations
            conversations_ids = [
                str(conversation["_id"]) for conversation in conversations
            ]
            print(conversations_ids)
            # Perform all delete operations in one go for efficiency
            delete_messages_result = messages_collection.delete_many(
                {"conversation_id": {"$in": conversations_ids}}
            )
            delete_conversations_result = conversations_collection.delete_many(
                {"email": user.email}
            )
            # Ensure all delete operations were successful
            if (
                delete_messages_result.deleted_count == 0
                or delete_conversations_result.deleted_count == 0
            ):
                raise HTTPException(
                    status_code=500,
                    detail="Failed to delete some or all of the user's data.",
                )

        users_collection.delete_one({"email": user.email})

        return {"detail": "User account and associated data successfully deleted."}

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}"
        ) from e


@app.post("/api/save-image-content", response_model=UserInDB)
async def save_image(
    file: UploadFile = File(...), user: UserInDB = Depends(get_current_user)
):
    try:
        # Read the file content
        content = await file.read()

        # Compute a hash of the image content
        file_hash = hashlib.sha256(content).hexdigest()

        # Generate a unique key for the file based on the hash
        file_key = f"profile_pictures/{file_hash}_{file.filename}"

        # Check if the file already exists in S3
        try:
            s3_client.head_object(Bucket=BUCKET_NAME, Key=file_key)
            s3_url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{file_key}"
            print("File already exists in S3.")
        except s3_client.exceptions.ClientError as e:
            if e.response["Error"]["Code"] == "404":
                # If the file does not exist, upload it
                s3_client.put_object(
                    Bucket=BUCKET_NAME,
                    Key=file_key,
                    Body=content,
                    ContentType=file.content_type,
                )
                s3_url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{file_key}"
                print("File uploaded to S3.")
            else:
                raise HTTPException(
                    status_code=500, detail=f"Error checking file in S3: {str(e)}"
                ) from e

        # Find the user document in the collection by email
        record = users_collection.find_one({"email": user.email})
        if record:
            # Update the user's document with the S3 URL
            result = users_collection.find_one_and_update(
                {"email": user.email},  # Find the document by email
                {
                    "$set": {  # Use the $set operator to update the fields
                        "filename": file.filename,
                        "content_type": file.content_type,
                        "image_url": s3_url,  # Store the S3 URL in MongoDB
                        "image_hash": file_hash,  # Optionally store the hash for future checks
                    }
                },
                return_document=True,  # Return the updated document
            )

            if result:
                # Return updated user document
                return UserInDB(**result)

            raise HTTPException(status_code=500, detail="Failed to update user data")

        raise HTTPException(status_code=404, detail="User not found")

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to save image: {str(e)}"
        ) from e
