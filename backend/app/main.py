from fastapi import FastAPI, HTTPException
from app.models import UserMessage, MoodLog
from app.database import db, chat_collection
from app.utils import serialize_list

app = FastAPI(title="Emotional Wellbeing Chatbot API", version="1.0")

@app.get("/")
def root():
    return {"message": "Welcome to the Emotional Wellbeing Chatbot API 💬"}

# ✅ Save user message
@app.post("/chat")
async def save_message(message: UserMessage):
    try:
        result = await chat_collection.insert_one(message.dict())
        return {"status": "Message saved successfully", "id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ✅ Get chat history for a user
@app.get("/chat/{user_id}")
async def get_user_chats(user_id: str):
    try:
        chats = await chat_collection.find({"user_id": user_id}).to_list(1000)
        return serialize_list(chats)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/mood")
async def log_mood(mood: MoodLog):
    """Log user's mood"""
    await db.mood_logs.insert_one(mood.dict())
    return {"status": "Mood logged"}


@app.get("/mood/{user_id}")
async def get_mood_trends(user_id: str):
    """Fetch mood trends for a user"""
    moods = await db.mood_logs.find({"user_id": user_id}).to_list(None)
    return serialize_list(moods)