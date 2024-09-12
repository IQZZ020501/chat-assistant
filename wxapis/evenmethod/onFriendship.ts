import {FriendshipInterface} from "wechaty/dist/cjs/src/user-modules/friendship";
import {wechat} from "../app";

export async function onFriendship(friendship: FriendshipInterface) {
    const contact = friendship.contact();
    const contactName = contact.name();
    const contactHandle = contact.id || "";
    const contactType = friendship.type();
    console.log(`
        =======================================================
                             onFriendship
        friendship: ${friendship}         contact: ${contact}
        contactName: ${contactName}       contactHandle: ${contactHandle}
        contactType: ${contactType}
        =======================================================
    `)
    switch (friendship.type()) {
        case wechat.Friendship.Type.Receive:
            console.log("接收到了好友请求>>>>>:", friendship.contact().name());
            await friendship.accept();
            console.log("已自动同意好友请求");
            break;
        case wechat.Friendship.Type.Verify:
            console.log("好友请求验证>>>>>:", friendship.contact().name());
            break;
        case wechat.Friendship.Type.Confirm:
            console.log("好友请求确认>>>>>:", friendship.contact().name());
    }
}
