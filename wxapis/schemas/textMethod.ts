import {MessageInterface} from "wechaty/dist/cjs/src/user-modules/message";
import {ContactInterface} from "wechaty/dist/cjs/src/user-modules/contact";
import {handleNormalMessage} from "../common/handleNormalMessage";
import {handleRoomMessage} from "../common/handleRoomMessage";
import {RoomInterface} from "wechaty/dist/cjs/src/user-modules/room";

export interface textMethod {
    message: MessageInterface
    sender: ContactInterface
    content: string
    handle: string
    messageType: number
    wechatHandel: string
    wechatName: string
}

export interface textRoomMethod extends textMethod {
    roomMessage: RoomInterface
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
export async function textMethod({
                                     message,
                                     sender,
                                     content,
                                     handle,
                                     messageType,
                                     wechatHandel,
                                     wechatName,
                                 }: textMethod) {
    return await handleNormalMessage(message, sender, content, handle, messageType, wechatHandel, wechatName)
}

export async function textRoomMethod({
                                         roomMessage,
                                         message,
                                         sender,
                                         content,
                                         handle,
                                         messageType,
                                         wechatHandel,
                                         wechatName,
                                     }: textRoomMethod) {
    return await handleRoomMessage(roomMessage, message, sender, content, handle, messageType, wechatHandel, wechatName)
}