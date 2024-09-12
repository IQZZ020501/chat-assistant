import {MessageInterface} from "wechaty/dist/cjs/src/user-modules/message";
import {ContactInterface} from "wechaty/dist/cjs/src/user-modules/contact";
import {wechat} from "../app";
import {FileBox} from 'file-box';

interface fileMethod {
    message: MessageInterface
    sender: ContactInterface
    contactHandel: string
    contactName: string
    messageType: number
    wechatHandel: string
    wechatName: string
}

export async function fileMethod({
                                     message,
                                     sender,
                                     contactHandel,
                                     contactName,
                                     messageType,
                                     wechatHandel,
                                     wechatName,
                                 }: fileMethod) {
    console.log(`
    =======================================================
                    fileMethod
    message: ${message},sender: ${sender},contactHandel: ${contactHandel},
    contactName: ${contactName},  messageType: ${messageType},
    wechatHandel: ${wechatHandel},wechatName: ${wechatName}
    =======================================================
    `)
    switch (messageType) {
        case wechat.Message.Type.Image:
            let img_fileBox = await message.toFileBox();
            console.log(img_fileBox)
            const fileBox = FileBox.fromBuffer(await img_fileBox.toBuffer(), img_fileBox.name);
            await saveFileBox(fileBox, `./file/${img_fileBox.name}`);
            break;
        case wechat.Message.Type.Video:
            let video_fileBox = await message.toFileBox();
            console.log(video_fileBox)
            const videoBox = FileBox.fromBuffer(await video_fileBox.toBuffer(), video_fileBox.name);
            await saveFileBox(videoBox, `./file/${video_fileBox.name}`);
            break;
    }

}

async function saveFileBox(fileBox: FileBox, filePath: string) {
    try {
        await fileBox.toFile(filePath, true);
        console.log(`File saved to ${filePath}`);
    } catch (error) {
        console.error('Error saving file:', error);
    }
}