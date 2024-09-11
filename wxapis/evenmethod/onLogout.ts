import {ContactSelfInterface} from "wechaty/dist/cjs/src/user-modules/contact-self";

export async function onLogout(user: ContactSelfInterface) {
    console.log(`${user} logout`)
}
