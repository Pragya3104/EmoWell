import speech_recognition as sr

def transcribe_audio(audio_path: str) -> str:
    """Convert audio file to text"""
    recognizer = sr.Recognizer()
    try:
        with sr.AudioFile(audio_path) as source:
            audio_data = recognizer.record(source)
            text = recognizer.recognize_google(audio_data)
            return text
    except sr.UnknownValueError:
        return "Sorry, I could not understand the audio."
    except Exception as e:
        print("Voice Processing Error:", e)
        return "Error processing audio input."
