
# Standard Imports
from typing import Optional, List
from datetime import datetime, timedelta

# Third Party Imports
import bcrypt
from bson import ObjectId
from jose import JWTError, jwt
from pymongo import MongoClient
from pydantic import BaseModel, EmailStr, Field
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, Depends, Body, Query
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer

# MongoDB configuration
MONGODB_URI = "mongodb+srv://zhatz111:Pheasant22a@sweetaura.znm4c.mongodb.net/?retryWrites=true&w=majority&appName=SweetAura"
PORT = 8000
client = MongoClient(MONGODB_URI, PORT)
db = client["auth_db"]
users_collection = db["users"]
conversations_collection = db["conversations"]
messages_collection = db["messages"]

conversations_collection.create_index("participants")
messages_collection.create_index([("conversation_id", 1), ("time_created", 1)])

# Security configuration
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"  # Replace with a strong secret key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update with your frontend domain if possible for security
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)


# Pydantic models
class User(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserInDB(BaseModel):
    username: str
    email: EmailStr
    hashed_password: str
    id: Optional[str] = None


class Token(BaseModel):
    access_token: str
    token_type: str


class Conversation(BaseModel):
    id: Optional[str] = None  # MongoDB ObjectId or UUID
    participants: List[str]  # List of participant usernames or IDs
    created_at: datetime = Field(default_factory=datetime.utcnow)  # Timestamp for when the conversation was created
    
    class Config:
        json_encoders = {ObjectId: str}  # Serialize MongoDB ObjectId


class Message(BaseModel):
    id: Optional[str] = None  # MongoDB ObjectId or UUID
    sender: str  # Username or ID of the sender
    content: str  # Message content
    time_created: datetime = Field(default_factory=datetime.utcnow)
    conversation_id: str  # ID of the associated conversation
    
    class Config:
        json_encoders = {ObjectId: str}  # Serialize MongoDB ObjectId



# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


# Utility functions
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
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


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


# Routes
@app.post("/api/register", response_model=Token)
async def register(user: User):
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = hash_password(user.password)
    print(f"Registering user: {user.email} with hashed_password: {hashed_password}")
    new_user = {**user.model_dump(), "hashed_password": hashed_password}
    del new_user["password"]
    users_collection.insert_one(new_user)
    access_token = create_access_token(data={"sub": user.email})  # Use email in token
    return {"access_token": access_token, "token_type": "bearer"}


@app.post("/api/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = get_user(form_data.username)  # `form_data.username` holds the email
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    print(f"Login attempt for: {form_data.username}, Stored Hash: {user.hashed_password}")  # Debug print

    if not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/api/user", response_model=UserInDB)
async def get_user_data(current_user: UserInDB = Depends(get_current_user)):
    """
    Fetch the current user's data.
    """
    user_data = user_data = users_collection.find_one({"email": current_user.email})
    print(current_user.email)
    if not user_data:
        raise HTTPException(status_code=404, detail="User not found")
    user_data["hashed_password"] = ""
    return UserInDB(**user_data)  # Return user data (excluding hashed_password)

@app.post("/api/conversations", response_model=Conversation)
async def create_conversation(participants: List[str] = Body(...)):
    """
    Create a new conversation with specified participants.
    """
    conversation = {
        "participants": participants,
        "created_at": datetime.utcnow(),
    }
    result = conversations_collection.insert_one(conversation)
    conversation["_id"] = str(result.inserted_id)
    return Conversation(**conversation)

@app.post("/api/messages", response_model=Message)
async def send_message(
    conversation_id: str = Body(...),
    sender: str = Body(...),
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
        "sender": sender,
        "content": content,
        "time_created": datetime.utcnow(),
        "conversation_id": conversation_id,
    }
    result = messages_collection.insert_one(message)
    message["_id"] = str(result.inserted_id)
    return Message(**message)

@app.get("/api/conversations/{conversation_id}/messages", response_model=List[Message])
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
        message["_id"] = str(message["_id"])
    return [Message(**msg) for msg in messages]

@app.get("/api/conversations", response_model=List[Conversation])
async def list_conversations(user: str = Query(...)):
    """
    List all conversations for a specific participant.
    """
    conversations = list(
        conversations_collection.find({"participants": user}).sort("created_at", -1)
    )
    for conversation in conversations:
        conversation["_id"] = str(conversation["_id"])
    return [Conversation(**conv) for conv in conversations]
