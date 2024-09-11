from pydantic import BaseModel


class RequestMessage(BaseModel):
    contact_name: str
    contact_handle: str
    content: str
    messageType: int
    wechatHandler: str
    wechatName: str
