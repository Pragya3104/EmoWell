import motor.motor_asyncio
from dotenv import load_dotenv
from pathlib import Path
import os

# Load environment variables
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")

if not MONGO_URI or not DB_NAME:
    raise ValueError("Missing MongoDB configuration in .env")

# Initialize MongoDB client
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]

# Optional: Define collection references
chat_collection = db["chat_history"]
mood_collection = db["mood_trends"]

print(f"✅ Connected to MongoDB: {DB_NAME}")
