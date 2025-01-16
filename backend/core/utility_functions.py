
# Standard Imports
import os
from typing import Dict
from datetime import datetime, timedelta, timezone

# Third Party Imports
import bcrypt
from dotenv import load_dotenv
from jose import JWTError, jwt
from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer

# Local Imports
# pylint: disable=import-error
from schemas.schema import UserInDB
from core.database import users_collection

# --------------------------------------------------------------------------

# Load in all env variables
load_dotenv()

# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")

# Security Configuration
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = float(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))
REFRESH_TOKEN_EXPIRE_DAYS = float(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS"))

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


def create_access_token(data: dict, expires_delta: int | None = None) -> str:
    to_encode = data.copy()
    
    # If expires_delta is None, use default expiration time (ACCESS_TOKEN_EXPIRE_MINUTES)
    if expires_delta:
        expire = datetime.now(timezone.utc) + timedelta(minutes=float(expires_delta))
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def create_refresh_token(data: dict, expires_delta: int | None = None) -> str:
    to_encode = data.copy()
    
    # If expires_delta is None, use default expiration time (REFRESH_TOKEN_EXPIRE_DAYS)
    if expires_delta:
        expire = datetime.now(timezone.utc) + timedelta(minutes=float(expires_delta))
    else:
        expire = datetime.now(timezone.utc) + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    
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
