import {ContactSelfInterface} from "wechaty/dist/cjs/src/user-modules/contact-self";
import {setCache} from "../utils/cache";

export async function onLogin(user: ContactSelfInterface) {
    const wechatyName = user.name()
    const wechatyHandle = user.id
    console.log(`
    ==============================================================================
    Wechaty logged in: ${wechatyName} (Handle: ${wechatyHandle})
    ==============================================================================
    `)
    setCache("wechatyName", wechatyName)
    setCache("wechatyHandle", wechatyHandle)
}
