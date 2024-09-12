from typing import Dict, Any
from fastapi import FastAPI, APIRouter
from models.common.model import RequestMessage
from agent import chat
from models.utils.logger import logger

app = FastAPI()

chat_history = []


class MessageAPI:

    def __init__(self):
        self.router = APIRouter()
        self.router.add_api_route("/api/v1/request_message", self.request_message, methods=["POST"])

    @staticmethod
    async def request_message(request_message: RequestMessage) -> Dict[str, Any]:
        chat_history.append({"role": "user", "content": request_message.content})
        result = await chat.chat_text_result(request_message.content, chat_history)
        if result is None:
            logger.error(f"contact_name: {request_message.contact_name}, error  message：{result}")
            return {"code": 500, "message": "error"}
        logger.info(f"reply contact_name: {request_message.contact_name} message：{result}")
        chat_history.append({"role": "assistant", "content": result})
        return {"code": 200, "message": result}


message_api = MessageAPI()
app.include_router(message_api.router)

if __name__ == '__main__':
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)
