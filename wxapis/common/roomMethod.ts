import {wechat} from "../app";
import {RoomInterface} from "wechaty/dist/cjs/src/user-modules/room";
import {ContactInterface} from "wechaty/dist/cjs/src/user-modules/contact";
import {MessageInterface} from "wechaty/dist/cjs/src/user-modules/message";
import {textRoomMethod} from "../schemas/textMethod";

interface roomMethod {
    message: MessageInterface
    roomMessage: RoomInterface
    sender: ContactInterface
    senderName: string
    senderHandle: string
    wechatName: string
    wechatHandel: string
    messageType: number
    content: string
}

export async function onRoomMethod({
                                       message,
                                       roomMessage,
                                       sender,
                                       senderName,
                                       senderHandle,
                                       wechatName,
                                       wechatHandel,
                                       messageType,
                                       content
                                   }: roomMethod) {
    console.log(`
        ==============================================================================
                                    Room Method
        Room: ${await roomMessage.topic()}  Sender: ${senderName}  Handle: ${senderHandle}
        Sender: ${sender}  WechatName: ${wechatName}  WechatHandle: ${wechatHandel}
                                  Content: ${content}
        ==============================================================================
    `);
    switch (messageType) {
        case wechat.Message.Type.Text:
            if (content.startsWith("@只要he")) {
                const contactMessage = content.replace("@只要he", "").trim();
                await textRoomMethod({
                    roomMessage,
                    message,
                    sender,
                    content: contactMessage,
                    handle: senderHandle,
                    messageType: messageType,
                    wechatHandel: wechatHandel,
                    wechatName: wechatName
                })
            }
            console.log("Text message received");
            break;
        case wechat.Message.Type.Image:
            console.log("Image message received");
            break;
        case wechat.Message.Type.Audio:
            console.log("Audio message received");
            break;
        case wechat.Message.Type.Video:
            console.log("Video message received");
            break;
        case wechat.Message.Type.Url:
            console.log("URL message received");
            break;
        case wechat.Message.Type.Attachment:
            console.log("Attachment message received");
            break;
        case wechat.Message.Type.Emoticon:
            console.log("Emoticon message received");
            break;
        case wechat.Message.Type.MiniProgram:
            console.log("MiniProgram message received");
            break;
        case wechat.Message.Type.Location:
            console.log("Location message received");
            break;
        default:
            console.log("Unknown message type");
    }
}