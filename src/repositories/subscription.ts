import { prisma } from "../db";
import { DeleteListingInterface } from "../interface/authInterface";
import { CreateSubscriptionInterface } from "../interface/subscriptionInterface";


export const findUnique = async({userId , location} : CreateSubscriptionInterface) => {
    const notification = await prisma.subscription.findFirst({
        where : {
            userId,
            location: {
                hasEvery: location
            }
        }
    })
    return notification
}

export const Create = async ({userId , location} : CreateSubscriptionInterface) => {
    const subscription = await prisma.subscription.create({
        data : {
            userId,
            location
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

export const DeleteSubscription = async(userId : string) => {
    const subscription = await prisma.subscription.deleteMany({
        where : {
            userId
        }
    })
    return subscription
 }

export const DeleteListingSubscription = async(userId : string) => {
    const subscription = await prisma.listingNotifySubscription.deleteMany({
        where : {
            userId
        }
    })
    return subscription
}

export const SubscriptionCount = async(userId: string) => {
    const count = await prisma.subscription.count({
        where : {
            userId
        }
    })
    return count
} 

export const ListingSubscriptionCount = async(userId: string) => {
    const count = await prisma.listingNotifySubscription.count({
        where : {
            userId
        }
    })
    return count
}

export const GetListingSuscribers = async(listingId : string) => {
    const subscribers = await prisma.listingNotifySubscription.findMany({
        where : {
            listingId
        }
    })
    return subscribers
}