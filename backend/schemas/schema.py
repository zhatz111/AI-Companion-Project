
# Standard Imports
from typing import Optional
from datetime import datetime, timezone

# Third Party Imports
from bson import ObjectId
from pydantic import BaseModel, EmailStr, Field


# Pydantic models
class User(BaseModel):
    username: str
    email: EmailStr
    password: str = Field(..., min_length=6)
    confirm_password: str = Field(..., min_length=6)

class UserInDB(BaseModel):
    username: str
    email: EmailStr
    hashed_password: str
    enabled: bool = True
    signed_up: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    last_login: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    confirmed_email: bool = False
    id: Optional[str] = None
    age: Optional[int] = None
    height_feet: Optional[int] = None
    height_inches: Optional[int] = None
    weight: Optional[int] = None
    gender: Optional[str] = None
    identity: Optional[str] = None
    sexuality: Optional[str] = None
    politics: Optional[str] = None
    filename: Optional[str] = None
    content_type: Optional[str] = None
    image_url: Optional[str] = None
    image_hash: Optional[str] = None


class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str


class Conversation(BaseModel):
    id: str  # MongoDB ObjectId or UUID
    email: EmailStr  # username or email of person
    ai_character: str  # name of the AI character
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )  # Timestamp for when the conversation was created

    class Config:
        json_encoders = {ObjectId: str}  # Serialize MongoDB ObjectId


class Message(BaseModel):
    id: str  # MongoDB ObjectId or UUID
    sender: str  # Username or ID of the sender
    role: str # role specification for llm post request
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
