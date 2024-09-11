import Agently
from typing import List, Dict, Union
from ..setting.config import conf
import time
import asyncio
import threading


class BaseAgent:
    def __init__(self, debug: bool = False, stream: bool = False):
        self.debug = debug
        self.stream = stream
        self.reply_queues = asyncio.Queue()
        self.agent: Agently.Agent = self.create_base_agent()

    def create_base_agent(self) -> Agently.Agent:
        agent_factory = Agently.AgentFactory()
        agent_factory.set_settings("current_model", conf()["model_name"])
        agent_factory.set_settings("model.ERNIE.auth", {conf()["api_type"]: conf()["access_token"]})
        agent_factory.set_settings("model.ERNIE.options",
                                   {"model": conf()["model_type"], "temperature": conf()["temperature"]})
        return agent_factory.create_agent(is_debug=self.debug)

    def set_role(self, role: str):
        self.agent.role(role)

    def set_instruct(self, instruct: str):
        self.agent.instruct(instruct)

    async def get_text_result(self, user_input: str, chat_history: List[dict] = None) -> str:
        if self.stream:
            return await self.get_stream_text_result(user_input, chat_history)
        return await self._get_result(user_input, chat_history)

    async def _get_result(self, user_input: str, chat_history: List[dict] = None) -> str:
        start_time = time.time() if self.debug else None
        text_result = (
            self.agent
            .input(user_input)
            .set_request_prompt("chat_history", chat_history)
            .start()
        )
        if self.debug:
            execution_time = time.time() - start_time
            print(f"\n本轮大模型回复时间为：{execution_time}秒\n")
        return text_result

    async def get_stream_text_result(self, user_input: str, chat_history: List[dict] = None) -> str:
        @self.agent.on_event("delta")
        async def on_delta(data):
            await self.reply_queues.put(data)

        @self.agent.on_event("done")
        async def on_done():
            await self.reply_queues.put("$STOP")

        threading.Thread(
            target=self.agent
            .input(user_input)
            .set_request_prompt("chat_history", chat_history)
            .start
        ).start()

        return await self._collect_streamed_replies()

    async def _collect_streamed_replies(self) -> str:
        summary_reply = ""
        while True:
            reply = await self.reply_queues.get()
            if reply == "$STOP":
                break
            summary_reply += str(reply)
            if not self.debug:
                print(f"流式输出：{reply}")
        return summary_reply

    async def get_structured_result(
            self,
            output_format: Dict[str, Union[str, list, dict]],
            user_input: str = "",
            chat_history: List[dict] = None
    ) -> dict:
        start_time = time.time() if self.debug else None
        structured_result = (
            self.agent
            .input(user_input)
            .set_request_prompt("chat_history", chat_history)
            .output(output_format)
            .start()
        )
        if self.debug:
            execution_time = time.time() - start_time
            print(f"\n本轮大模型回复时间为：{execution_time}秒\n")
        return await self._ensure_dict_result(structured_result, user_input, chat_history, output_format)

    async def _ensure_dict_result(
            self,
            result: Union[dict, any],
            user_input: str,
            chat_history: List[dict],
            output_format: Dict[str, Union[str, list, dict]]
    ) -> dict:
        if isinstance(result, dict):
            return result
        print("\n第一轮结构化输出没有得到预期的字典结构，尝试第二次输出\n")
        return (
            self.agent
            .input(user_input)
            .set_request_prompt("chat_history", chat_history)
            .output(output_format)
            .start()
        )
