import { Get } from "../repositories/notification"

export const GetNotification = async (userId: string) => {
    const notification = await Get(userId);
    if(notification.length == 0){
        return {
            message : "no notification yet",
            status : 404
        }
    }
    return {
        message : "Notification fetched successfully",
        status : 200,
        data : notification
    }    

}