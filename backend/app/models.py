from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class UserMessage(BaseModel):
    user_id: str
    message: str
    sentiment: Optional[str] = None
    timestamp: datetime = datetime.utcnow()

class MoodLog(BaseModel):
    user_id: str
    mood: str
    created_at: datetime = Field(default_factory=datetime.utcnow)