from typing import Any
from models.agent.baseAgent import BaseAgent
from models.utils.logger import logger


class ChatAgent(BaseAgent):
    def __init__(self, debug: bool = True, stream: bool = False):
        super().__init__(debug, stream)

    async def chat_text_result(self, user_input: str, chat_history: list = None) -> Any | None:
        try:
            result = (self.agent.general(
                "输出规定", "必须使用中文进行输出"
            ).role({
                "姓名": "聊天小助手",
                "任务": "和用户聊天让用户感受到快乐和开心",
            }).user_info(
                "和你对话的用户是一个幽默且有风趣的人"
            ).input({
                "question": user_input,
                "reply_style_expect": "请你使用幽默有风趣方式进行回答，让用户感到愉悦",
            }).instruct([
                "请使用{reply_style_expect}的回复风格，回复{question}提出的问题",
            ]).chat_history(
                chat_history
            ).output({
                "reply": ("str", "对{question}的直接回复"),
                "next_questions": (
                    [
                        (
                            "str", "根据{reply}内容，结合{user_info}提供的用户信息，" + "给用户推荐的可以进一步提问的问题"
                        )
                    ],
                    "不少于3个"
                ),
            })
            ).start()
            print(result)
            if isinstance(result, dict):
                return result.get("reply")
        except Exception as e:
            logger.error(e)
            return None
