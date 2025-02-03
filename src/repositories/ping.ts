import { prisma } from "../db";

export const Create = async ({message , postId , userId}  : any) => {
        const ping = await prisma.ping.create({
            data : {
                message,
                postId,
                userId,
            }
        })
        return ping
}

export const Update = async ({message , pingId , userId} : any) => {
    const ping = await prisma.ping.update({
        where : {
           id : pingId,
           userId : userId
        },
        data  :{
           message : message
        }
       })
       return ping
}

export const findMany = async(userId : string) => {
    const pings = await prisma.ping.findMany({
        where : {
            userId : userId
        }
    })
    return pings
} 