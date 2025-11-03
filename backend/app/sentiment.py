import os
import requests
from dotenv import load_dotenv
from pathlib import Path

# Load .env
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY")
API_URL = "https://api-inference.huggingface.co/models/finiteautomata/bertweet-base-sentiment-analysis"


if not HUGGINGFACE_API_KEY:
    raise ValueError("Missing Hugging Face API key in .env")

headers = {"Authorization": f"Bearer {HUGGINGFACE_API_KEY}"}

def analyze_sentiment(text: str):
    """Call Hugging Face model to get sentiment for given text"""
    try:
        response = requests.post(API_URL, headers=headers, json={"inputs": text})
        response.raise_for_status()
        result = response.json()

        if isinstance(result, list) and len(result) > 0:
            prediction = result[0]
            sentiment_data = max(prediction, key=lambda x: x["score"])
            return {
                "label": sentiment_data["label"].lower(),
                "score": round(sentiment_data["score"], 3)
            }
        else:
            return {"label": "neutral", "score": 0.0}

    except Exception as e:
        print("Sentiment API Error:", e)
        return {"label": "neutral", "score": 0.0}
