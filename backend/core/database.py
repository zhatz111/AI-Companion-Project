
# Standard Imports
import os

# Third Party Imports
import boto3
from openai import OpenAI
from dotenv import load_dotenv
from pymongo import MongoClient

# Load in all env variables
load_dotenv()

# -------------------------------------------------------

# MongoDB configuration
USERNAME = os.getenv("USERNAME")
PASSWORD = os.getenv("PASSWORD")
MONGODB_URI = os.getenv("MONGODB_URI")
PORT = int(os.getenv("PORT"))
mongo_client = MongoClient(MONGODB_URI, PORT)

# Database Collections
db = mongo_client["auth_db"]
users_collection = db["users"]
conversations_collection = db["conversations"]
messages_collection = db["messages"]
password_resets_collection = db["password_resets"]
feedback_collection = db["feedback"]

# Indexes for easier query
# conversations_collection.create_index("email")
# messages_collection.create_index([("conversation_id", 1), ("time_created", 1)])

# -------------------------------------------------------

# AWS S3 Configuration
AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY")
AWS_SECRET_KEY = os.getenv("AWS_SECRET_KEY")
BUCKET_NAME = "sweetauraimages"
s3_client = boto3.client(
    "s3", aws_access_key_id=AWS_ACCESS_KEY, aws_secret_access_key=AWS_SECRET_KEY
)

# -------------------------------------------------------

# OpenAI Configuration
open_AI_client = OpenAI(
    base_url=os.getenv("BASE_URL"), api_key=os.getenv("TOGETHER_API_KEY")
)
