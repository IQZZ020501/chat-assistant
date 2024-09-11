import {ScanStatus, WechatyBuilder} from "wechaty";
import {onScan} from "./evenmethod/onScan";
import {onLogin} from "./evenmethod/onLogin";
import {onMessage} from "./evenmethod/onMessage";
import {onFriendship} from "./evenmethod/onFriendship";
import {onError} from "./evenmethod/onError";
import {onLogout} from "./evenmethod/onLogout";
import {onRoomJoin} from "./evenmethod/onRoomJoin";
import {onRoomLeave} from "./evenmethod/onRoomLeave";
import {onRoomTopic} from "./evenmethod/onRoomTopic";
import {onRoomInvite} from "./evenmethod/onRoomInvite";

const name = 'wechaty-apps'

process.env.WECHATY_PUPPET = "wechaty-puppet-wechat"
const wechat = WechatyBuilder.build({
    name,
    puppet: 'wechaty-puppet-wechat4u',
    puppetOptions: {
        uos: true
    }
})

wechat.on("scan", async (qrcode: string, status: ScanStatus) => {
    await onScan(qrcode, status)
})

wechat.on("login", async (user: any) => {
    await onLogin(user)
})

wechat.on("message", async (message: any) => {
    await onMessage(message)
})

wechat.on("friendship", async (friendship: any) => {
    await onFriendship(friendship)
})

wechat.on("room-join", async (room: any, inviteeList: any, inviter: any) => {
    await onRoomJoin(room, inviteeList, inviter)
})

wechat.on("room-leave", async (room: any, leaverList: any, remover: any) => {
    await onRoomLeave(room, leaverList, remover)
})

wechat.on("room-topic", async (room: any, newTopic: any, oldTopic: any, changer: any, date: any) => {
    await onRoomTopic(room, newTopic, oldTopic, changer, date)
})

wechat.on("room-invite", async (room: any) => {
    await onRoomInvite(room)
})

wechat.on("logout", async (user: any) => {
    await onLogout(user)
})

wechat.on("error", async (error: any) => {
    await onError(error)
})

wechat.start().then(() => {
    console.log("Wechaty started")
})

export {wechat}
