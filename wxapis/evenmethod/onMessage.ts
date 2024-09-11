import {MessageInterface} from "wechaty/dist/cjs/src/user-modules/message";
import {wechat} from "../app";
import {textMethod} from "../schemas/textMethod";
import {getCache} from "../utils/cache";

export async function onMessage(message: MessageInterface) {
    const sender = message.talker();
    await sender.sync();
    const content = message.text();
    const senderName = sender.name();
    const senderHandle = sender.id || "";
    const messageType = message.type();
    const wechatName = getCache("wechatyName");
    const wechatHandle = getCache("wechatyHandle");


    console.log(`
        ==============================================================================
        Message from ${senderName} (Handle: ${senderHandle}, Type: ${messageType})
        Content: ${content} Sender: ${sender}
        ==============================================================================
    `);

    switch (messageType) {
        case wechat.Message.Type.Text:
            const textResponseBool = await textMethod({
                message,
                sender,
                content,
                handle: senderHandle,
                messageType: messageType,
                wechatHandel: wechatHandle,
                wechatName: wechatName
            })
            console.log(`textResponseBool: ${textResponseBool}`)
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
