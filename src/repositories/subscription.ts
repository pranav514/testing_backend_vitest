import { prisma } from "../db";
import { DeleteListingInterface } from "../interface/authInterface";

export const findUnique = async(userId : string) => {
    const notification = await prisma.subscription.findFirst({
        where : {
            userId,

        }
    })
    return notification
}

export const Create = async (userId  : string) => {
    const subscription = await prisma.subscription.create({
        data : {
            userId,
        }
    })
    return subscription
}

export const FindMany = async() => {
    const subscribers = await prisma.subscription.findMany({});
    return subscribers
}
export const FindListingSuscribers = async(listingId : string) => {
    const subscribers = await prisma.listingNotifySubscription.findMany({
        where : {
            listingId
        }
    })
    return subscribers
}

export const CreateListingSubsripton  = async({userId, listingId} : DeleteListingInterface) => {
    const listing_suscription  = await prisma.listingNotifySubscription.create({
        data : {
            userId,
            listingId
        }
    })
    return listing_suscription

}