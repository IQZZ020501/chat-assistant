import axios, {AxiosResponse} from "axios";
import {config} from "../config";
import logger from "../utils/logger";
import {ContactInterface} from "wechaty/dist/cjs/src/user-modules/contact";
import {MessageInterface} from "wechaty/dist/cjs/src/user-modules/mod";

export async function handleNormalMessage(
    message: MessageInterface,
    sender: ContactInterface,
    content: string,
    handle: string,
    messageType: number,
    wechatHandel: string,
    wechatName: string,
) {
    try {
        console.log(`
        =======================================================
                        handleNormalMessage
        message: ${message},sender: ${sender},content: ${content},
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
                        handleNormalMessage
        textResponse: ${response}       type: ${typeof response}
        =======================================================
        `)
        if (response.code === 200) {
            await sender.say(response.message)
            logger.debug(`用户：${sender.name()} 发送消息：${response.content} 成功`)
            return true
        }
        await sender.say("哎呀，出错啦，请稍后再试")
        return false
    } catch (error) {
        logger.error('请求消息时出错: ', error);
    }
}
