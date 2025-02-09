import { prisma } from "../db";
import { DeleteListingInterface } from "../interface/authInterface";

export const findUnique = async({userId , listingId} : DeleteListingInterface) => {
    const notification = await prisma.subscription.findFirst({
        where : {
            userId,
            listingId

        }
    })
    return notification
}

export const Create = async ({userId , listingId} : DeleteListingInterface) => {
    const subscription = await prisma.subscription.create({
        data : {
            userId,
            listingId
        }
    })
    return subscription
}
