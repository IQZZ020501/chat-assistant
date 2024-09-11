import {FriendshipInterface} from "wechaty/dist/cjs/src/user-modules/friendship";

export async function onFriendship(friendship: FriendshipInterface) {
    console.log(friendship)
}
