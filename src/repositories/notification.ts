import { prisma } from "../db";
interface CreateNotification {
    userId : string,
    message : string
}
export const  Get = async(userId : string) => {
    const notification = await prisma.notification.findMany({
        where : {
            userId : userId
        }
    })
    return notification
}

export const Create  = async ({userId , message} : CreateNotification) => {
    const notification = await prisma.notification.create({
        data : {
            userId,
            message
        }
    })
    return notification
}