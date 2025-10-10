from fastapi import FastAPI

app = FastAPI(title = "Emotional Wellbeing Chatbot API")

@app.get("/")
async def root():
    return {"message": "Welcome to the Emotional Wellbeing Chatbot"}