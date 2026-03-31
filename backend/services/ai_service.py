import os
import httpx
import json
from dotenv import load_dotenv

load_dotenv()

class AIService:
    API_URL = "https://integrate.api.nvidia.com/v1/chat/completions"
    API_KEY = os.getenv("NVIDIA_API_KEY")
    MODEL = "meta/llama-3.1-70b-instruct"

    @staticmethod
    async def get_chat_response(messages: list):
        if not AIService.API_KEY:
            return {"error": "AI API Key not configured"}

        headers = {
            "Authorization": f"Bearer {AIService.API_KEY}",
            "Content-Type": "application/json"
        }

        system_prompt = {
            "role": "system",
            "content": "You are CYNTROL AI, a helpful assistant for students using the CYNTROL dashboard. You help students with their schedule, attendance, and marks. Keep your responses concise, professional, and student-focused."
        }

        # Prepend system prompt if not present
        if not messages or messages[0].get("role") != "system":
            messages.insert(0, system_prompt)

        data = {
            "model": AIService.MODEL,
            "messages": messages,
            "temperature": 0.5,
            "top_p": 0.7,
            "max_tokens": 1024,
            "stream": False
        }

        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(AIService.API_URL, headers=headers, json=data)
                response.raise_for_status()
                return response.json()
        except Exception as e:
            print(f"[AI] Error calling NVIDIA API: {str(e)}")
            return {"error": "Failed to get AI response"}
