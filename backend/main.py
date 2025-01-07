# Standard Imports
import os
import json
import secrets
from typing import Optional, List, Annotated, Dict
from datetime import datetime, timedelta, timezone

# Third Party Imports
import bcrypt
from openai import OpenAI
from bson import ObjectId
from dotenv import load_dotenv
from jose import JWTError, jwt
from pymongo import MongoClient
from pydantic_settings import BaseSettings
from pydantic import BaseModel, EmailStr, Field
from fastapi.middleware.cors import CORSMiddleware
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from fastapi import FastAPI, HTTPException, status, Request, Depends, Body, Query, Form

# Load in all env variables
load_dotenv()

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

# MONGODB

# MongoDB configuration
USERNAME = os.getenv("USERNAME")
PASSWORD = os.getenv("PASSWORD")
MONGODB_URI = f"mongodb+srv://{USERNAME}:{PASSWORD}@sweetaura.znm4c.mongodb.net/?retryWrites=true&w=majority&appName=SweetAura"
PORT = 8000
client = MongoClient(MONGODB_URI, PORT)
db = client["auth_db"]
users_collection = db["users"]
conversations_collection = db["conversations"]
messages_collection = db["messages"]
password_resets_collection = db["password_resets"]
feedback_collection = db["feedback"]

# Indexes for easier query
conversations_collection.create_index("username")
messages_collection.create_index([("conversation_id", 1), ("time_created", 1)])


# OpenAI Configuration
client = OpenAI(
    base_url="https://api.studio.nebius.ai/v1/", api_key=os.getenv("NEBIUS_API_KEY")
)

# Security configuration
SECRET_KEY = os.getenv("SECRET_KEY")  # Replace with a strong secret key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30  # 15 minutes
REFRESH_TOKEN_EXPIRE_DAYS = 7  # 7 days

# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")


# Pydantic models
class User(BaseModel):
    username: str
    email: EmailStr
    password: str = Field(..., min_length=6)


class UserInDB(BaseModel):
    username: str
    email: EmailStr
    hashed_password: str
    id: Optional[str] = None
    age: Optional[int] = None
    height_feet: Optional[int] = None
    height_inches: Optional[int] = None
    weight: Optional[int] = None
    gender: Optional[str] = None
    identity: Optional[str] = None
    sexuality: Optional[str] = None
    politics: Optional[str] = None


class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str


class Conversation(BaseModel):
    id: str  # MongoDB ObjectId or UUID
    username: str  # username or email of person
    ai_character: str  # name of the AI character
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )  # Timestamp for when the conversation was created

    class Config:
        json_encoders = {ObjectId: str}  # Serialize MongoDB ObjectId


class Message(BaseModel):
    id: str  # MongoDB ObjectId or UUID
    sender: str  # Username or ID of the sender
    content: str  # Message content
    time_created: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    conversation_id: str  # ID of the associated conversation

    class Config:
        json_encoders = {ObjectId: str}  # Serialize MongoDB ObjectId


class ResetPassword(BaseModel):
    email: EmailStr
    hashed_token: str
    expiration_time: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )
    reset_time: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class FeedbackForm(BaseModel):
    email: EmailStr
    subject: str = Field(..., min_length=1, max_length=100)
    message: str = Field(..., min_length=1, max_length=1000)
    valid_user: bool = (False,)
    feedback_time: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# Configuration settings
class EmailConfig(BaseSettings):
    MAIL_USERNAME: str
    MAIL_PASSWORD: str
    MAIL_FROM: EmailStr
    MAIL_PORT: int
    MAIL_SERVER: str
    MAIL_STARTTLS: bool = True
    MAIL_SSL_TLS: bool = False
    MAIL_FROM_NAME: str = "SweetAura"

    class Config:
        env_file = ".env"  # Use a .env file for sensitive information


# Load configuration
email_config = EmailConfig()

conf = ConnectionConfig(
    MAIL_USERNAME=email_config.MAIL_USERNAME,
    MAIL_PASSWORD=email_config.MAIL_PASSWORD,
    MAIL_FROM=email_config.MAIL_FROM,
    MAIL_PORT=email_config.MAIL_PORT,
    MAIL_SERVER=email_config.MAIL_SERVER,
    MAIL_STARTTLS=email_config.MAIL_STARTTLS,
    MAIL_SSL_TLS=email_config.MAIL_SSL_TLS,
    MAIL_FROM_NAME=email_config.MAIL_FROM_NAME,
)


# UTILITY FUNCTIONS


# Hash a password
def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed_password.decode("utf-8")


# Verify a password
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(
        plain_password.encode("utf-8"), hashed_password.encode("utf-8")
    )


def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (
        expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def create_refresh_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (
        expires_delta or timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    )
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def validate_access_token(token: str) -> Dict:
    """
    Validates the JWT token.
    - Decodes the token and checks the expiration.
    - Returns the payload if valid.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        # Check expiration
        if payload.get("exp") and datetime.fromtimestamp(
            payload["exp"], tz=timezone.utc
        ) < datetime.now(timezone.utc):
            raise HTTPException(status_code=401, detail="Token has expired")
        return payload
    except JWTError as e:
        raise HTTPException(status_code=401, detail="Invalid token") from e


def validate_refresh_token(refresh_token: str):
    try:
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError as exc:
        raise HTTPException(
            status_code=401, detail="Invalid or expired refresh token"
        ) from exc


def get_user(email: str) -> UserInDB | None:
    user = users_collection.find_one({"email": email})
    if user:
        # MongoDB adds an `_id` field by default, which is not part of your UserInDB model
        user.pop("_id", None)
        return UserInDB(**user)
    return None


# Verify token utility
def get_current_user(token: str = Depends(oauth2_scheme)) -> UserInDB:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        user = get_user(email)
        if user is None:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        return user
    except JWTError as exc:
        raise HTTPException(status_code=401, detail="Invalid credentials") from exc


async def send_reset_email(email: EmailStr, token: str):
    """
    Sends a password reset email with a reset link to the user.

    Args:
        email (str): The recipient's email address.
        token (str): The unique password reset token.

    Returns:
        None
    """
    reset_link = f"http://localhost:3000/reset-password?token={token}"

    subject = "Password Reset Request"
    body = f"""
    Hi,

    We received a request to reset your password. Use the link below to reset your password:
    {reset_link}

    If you did not request a password reset, please ignore this email.

    Thanks,
    Your App Team
    """
    html_body = f"""
    <html>
        <body>
            <p>Hi,</p>
            <p>We received a request to reset your password. Click the link below to reset your password:</p>
            <a href="{reset_link}">Reset Password</a>
            <p>If you did not request a password reset, please ignore this email.</p>
            <p>Thanks,<br>Your App Team</p>
        </body>
    </html>
    """

    message = MessageSchema(
        subject=subject,
        recipients=[email],  # List of recipients
        body=html_body,
        subtype="html",  # Send HTML content
    )

    fastmail = FastMail(conf)

    try:
        await fastmail.send_message(message)
        print(f"Password reset email sent to {email}")
    except Exception as e:
        print(f"Error sending email: {e}")


async def send_feedback_confirmation(email: EmailStr):
    """
    Sends a password reset email with a reset link to the user.

    Args:
        email (str): The recipient's email address.
        token (str): The unique password reset token.

    Returns:
        None
    """

    message = MessageSchema(
        subject="Feedback Received",
        recipients=[email],
        body="Thank you for reaching out to us! We've received your feedback and will respond shortly.",
        subtype="plain",
    )

    fastmail = FastMail(conf)

    try:
        await fastmail.send_message(message)
        print(f"Confirmation Email sent to: {email}")
    except Exception as e:
        print(f"Error sending confirmation email: {e}")


# -----------------------------------------------------------------

# ROUTES


@app.post("/api/register", response_model=Token)
async def register(user: User):
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = hash_password(user.password)

    new_user = {**user.model_dump(), "hashed_password": hashed_password}
    del new_user["password"]

    users_collection.insert_one(new_user)
    access_token = create_access_token(data={"sub": user.email})  # Use email in token
    return {"access_token": access_token, "token_type": "bearer"}


@app.post("/api/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = get_user(form_data.username)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    print(
        f"Login attempt for: {form_data.username}, Stored Hash: {user.hashed_password}"
    )  # Debug print

    if not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")

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
        "username": user.username,
        "ai_character": ai_character,
        "created_at": datetime.now(timezone.utc),
    }
    print(conversation)
    result = conversations_collection.insert_one(dict(conversation))
    conversation["id"] = str(result.inserted_id)
    return Conversation(**conversation)


@app.get("/api/conversations", response_model=List[Conversation])
async def list_conversations(username: str = Depends(get_current_user)):
    """
    List all conversations for a specific participant.
    """
    conversations = list(
        conversations_collection.find({"username": username}).sort("created_at", -1)
    )
    for conversation in conversations:
        conversation["id"] = str(conversation["_id"])
    return [Conversation(**conv) for conv in conversations]


@app.get("/api/check_conversation", response_model=Conversation)
async def check_conversation(
    user: UserInDB = Depends(get_current_user), ai_character: str = Query(...)
):
    """
    Check if a conversation exists for a specific user and AI character.
    """
    conversation = conversations_collection.find_one(
        {
            "username": user.username,  # Use user.username instead of the whole UserInDB object
            "ai_character": ai_character,
        }
    )

    if not conversation:
        # Return a 404 response if no conversation is found
        raise HTTPException(status_code=404, detail="Conversation not found")
    # Convert MongoDB ObjectId to string
    conversation["id"] = str(conversation["_id"])
    return Conversation(**conversation)


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
    content: str = Body(...),
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
        completion = client.chat.completions.create(
            model="mistralai/Mixtral-8x7B-Instruct-v0.1-fast",  # "mistralai/Mistral-Nemo-Instruct-2407",
            messages=[
                {
                    "role": "system",
                    "content": system_prompt,
                },  # System message setting context
                {"role": "user", "content": content},  # User message
            ],
            temperature=0.6,
            max_tokens=512,
            top_p=0.9,
        )

        response = completion.to_json()
        response_dict = json.loads(response)

        # Create the AI-generated message
        ai_message = {
            "sender": ai_character,
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
    await send_reset_email(email, token)

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
    print(token)
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
        print("did i make it this far???")
        print(refresh_token)
        payload = validate_refresh_token(
            refresh_token
        )  # Assuming this function validates the refresh token
        print("this is the payload")
        print(payload)
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


@app.delete("/api/delete-chats")
async def delete_chats(user: UserInDB = Depends(get_current_user)):

    try:
        # Fetch all conversations for the current user by username
        conversations = list(conversations_collection.find({"username": user.username}))

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
            {"username": user.username}
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
        conversations = list(conversations_collection.find({"username": user.username}))
        print(conversations)

        if conversations:
            # Extract conversation IDs to delete associated messages and conversations
            conversations_ids = [str(conversation["_id"]) for conversation in conversations]
            print(conversations_ids)
            # Perform all delete operations in one go for efficiency
            delete_messages_result = messages_collection.delete_many(
                {"conversation_id": {"$in": conversations_ids}}
            )
            delete_conversations_result = conversations_collection.delete_many(
                {"username": user.username}
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
