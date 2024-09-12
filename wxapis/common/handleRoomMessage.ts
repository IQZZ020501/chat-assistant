import {RoomInterface} from "wechaty/dist/cjs/src/user-modules/room";
import {MessageInterface} from "wechaty/dist/cjs/src/user-modules/message";
import {ContactInterface} from "wechaty/dist/cjs/src/user-modules/contact";
import axios, {AxiosResponse} from "axios";
import {config} from "../config";
import logger from "../utils/logger";

export async function handleRoomMessage(roomMessage: RoomInterface, message: MessageInterface, sender: ContactInterface, content: string, handle: string, messageType: number, wechatHandel: string, wechatName: string) {
    console.log(`
    =======================================================
                        handleRoomMessage
    roomMessage: ${roomMessage},message: ${message},sender: ${sender},content: ${content},
    handle: ${handle},  messageType: ${messageType},

    wechatHandel: ${wechatHandel},wechatName: ${wechatName}
    =======================================================
    `)
    const contact_name = sender.name();
    const messageResponse: AxiosResponse<any> = await axios.post(`${config.URL}/request_message`,
        {
            contact_name: contact_name,
            contact_handle: handle,
            content: content,
            messageType: messageType,
            wechatHandler: wechatHandel,
            wechatName: wechatName
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    const response = typeof messageResponse.data === 'string' ? JSON.parse(messageResponse.data) : messageResponse.data;
    console.log(`
        =======================================================
                        handleRoomMessage
        textResponse: ${response}       type: ${typeof response}
        =======================================================
        `)
    if (response.code === 200) {
        await roomMessage.say(response.message)
        logger.debug(`用户：${sender.name()} 发送消息：${response.content} 成功`)
        return true
    }
    await roomMessage.say("哎呀，出错啦，请稍后再试")
    return false
}