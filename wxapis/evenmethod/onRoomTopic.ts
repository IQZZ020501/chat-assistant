export async function onRoomTopic(room: any, oldTopic: any, newTopic: any, changer: any, date: any){
    console.log(`${changer} change the topic of ${room} from ${oldTopic} to ${newTopic} at ${date}`)
}
