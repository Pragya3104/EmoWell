import os
import requests
from dotenv import load_dotenv
from pathlib import Path
from groq import Groq

env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
if not GROQ_API_KEY:
    raise ValueError("Missing Groq API Key in .env")

client = Groq(api_key=GROQ_API_KEY)
conversation_memory = {}  # Temporary in-memory chat memory
conversation_memory = {}  # Temporary in-memory chat memory

def generate_response(user_id: str, message: str, sentiment: str):
    """
    Generate an empathetic response based on user's message and emotional tone,
    while keeping short-term conversation context.
    """
    # Keep track of recent user interactions
    if user_id not in conversation_memory:
        conversation_memory[user_id] = []
    conversation_memory[user_id].append({"role": "user", "content": message})

    context = "\n".join([f"{m['role']}: {m['content']}" for m in conversation_memory[user_id][-5:]])

    prompt = f"""
You are EmoWell, a warm, empathetic AI emotional wellbeing assistant.
The user’s current sentiment is: {sentiment}.
Here’s the recent conversation:
{context}

Now respond in a caring, encouraging, and conversational tone.
Your response should:
- Directly acknowledge what the user said.
- Be emotionally intelligent and contextually relevant.
- Avoid repeating previous advice unless asked.
- Be concise (max 3-4 sentences).
"""

    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You are a friendly emotional support assistant."},
                {"role": "user", "content": prompt}
            ],
        )

        reply = response.choices[0].message.content.strip()
        conversation_memory[user_id].append({"role": "assistant", "content": reply})
        return reply

    except Exception as e:
        print("Error in LLM response:", e)
        return "I'm here with you. Let's take a moment and try again together."