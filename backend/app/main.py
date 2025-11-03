from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.database import chat_collection
from app.sentiment import analyze_sentiment
from app.voice_service import transcribe_audio
from app.llm_service import generate_response
from bson import ObjectId
import shutil, os

# ---------------- APP SETUP ----------------
app = FastAPI(title="EmoWell Chatbot")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- MODELS ----------------
class ChatRequest(BaseModel):
    user_id: str
    message: str


# ---------------- ROUTES ----------------
@app.post("/chat")
async def chat(request: ChatRequest):
    """
    Handles text messages from the user and generates a context-aware bot reply.
    """
    try:
        # Analyze emotional tone
        sentiment = analyze_sentiment(request.message)

        # Generate empathetic and context-aware reply
        bot_reply = generate_response(request.user_id, request.message, sentiment["label"])

        # Store conversation in MongoDB
        chat_data = {
            "user_id": request.user_id,
            "message": request.message,
            "sentiment": sentiment,
            "bot_reply": bot_reply,
        }
        await chat_collection.insert_one(chat_data)

        # Return result to frontend
        return {
            "status": "Message processed",
            "reply": bot_reply,
            "sentiment": sentiment,
        }

    except Exception as e:
        print("Chat API Error:", e)
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/chat/voice")
async def chat_voice(user_id: str, file: UploadFile = File(...)):
    """
    Accepts an audio file, transcribes it, performs sentiment analysis,
    generates a response using Groq LLM, and stores it in MongoDB.
    """
    try:
        # Save temporary file
        file_path = f"temp_{file.filename}"
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Transcribe → Sentiment → Generate Response
        text = transcribe_audio(file_path)
        sentiment = analyze_sentiment(text)
        bot_reply = generate_response(text, sentiment["label"])

        chat_data = {
            "user_id": user_id,
            "message": text,
            "sentiment": sentiment,
            "bot_reply": bot_reply,
        }
        await chat_collection.insert_one(chat_data)

        os.remove(file_path)

        return {
            "status": "Voice processed successfully",
            "text": text,
            "sentiment": sentiment,
            "reply": bot_reply,
        }

    except Exception as e:
        print("Voice Chat Error:", e)
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/chat/{user_id}")
async def get_user_chats(user_id: str):
    """
    Retrieve all chat history for a given user_id.
    """
    try:
        chats = await chat_collection.find({"user_id": user_id}).to_list(1000)
        return chats
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
