import {MessageInterface} from "wechaty/dist/cjs/src/user-modules/message";
import {ContactInterface} from "wechaty/dist/cjs/src/user-modules/contact";
import {handleNormalMessage} from "../common/handleNormalMessage";

export interface textMethod {
    message: MessageInterface
    sender: ContactInterface
    content: string
    handle: string
    messageType: number
    wechatHandel: string
    wechatName: string
}

/**
 * 文本消息处理
 * @param message
 * @param sender
 * @param content
 * @param handle
 * @param messageType
 * @param wechatHandel
 * @param wechatName
 */
export async function textMethod({message, sender, content, handle, messageType, wechatHandel, wechatName}: textMethod) {
    return await handleNormalMessage(message, sender, content, handle, messageType, wechatHandel, wechatName)
}
