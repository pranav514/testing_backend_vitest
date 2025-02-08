import { prisma } from "../db";
import { PingCreate } from "../interface/pingInterface";

export const Create = async ({message , postId , userId}  : PingCreate) => {
        const ping = await prisma.ping.create({
            data : {
                message,
                postId,
                userId,
            }
        })
        return ping
}

export const Update = async ({message , postId , userId} : PingCreate) => {
    console.log(message);
    console.log(postId)
    console.log(userId)
    const ping = await prisma.ping.update({
        where : {
           id : postId,
           userId : userId
        },
        data  :{
           message : message
        }
       })
       console.log(ping);
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