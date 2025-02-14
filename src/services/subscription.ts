import { CreateSubscriptionInterface } from "../interface/subscriptionInterface"
import { Create, CreateListingSubsripton, DeleteListingSubscription, DeleteSubscription, findUnique, ListingSubscriptionCount, SubscriptionCount } from "../repositories/subscription"

export const CreateSubscriptions = async ({userId , location} : CreateSubscriptionInterface) => {
    const suscribed  = await findUnique({userId , location} )
    if(suscribed){
        return {
            message : "You have already subscribed to this listing",
            status : 409,
        }
    }
    const subscription = await Create({userId , location})
    return {
        message : "Subscribed successfully",
        status : 200,
        data : subscription
    }
}

export const CreateSubscriptionLisiting = async (userId : string, listingId : string) => {
    const subscription = await CreateListingSubsripton({userId, listingId})
    return {
        message : "Subscribed successfully",
        status : 200,
        data : subscription
    }
}

export const DeleteSubscriptions  = async (userId : string) => {
    const count = await SubscriptionCount(userId)
    if(count == 0){
        return {
            message : "You are not subscribed to any listing",
            status : 404
        }
    }
    const subscription = await DeleteSubscription(userId)
    return {
        message : "Subscription deleted successfully",
        status : 200,
        data : subscription
    }
}

export const DeleteListingSubscriptions  = async (userId : string) => {
    const count = await ListingSubscriptionCount(userId)
    if(count == 0){
        return {
            message : "You are not subscribed to any listing",
            status : 404
        }
    }
    const subscription = await DeleteListingSubscription(userId)
    return {
        message : "Subscription deleted successfully",
        status : 200,
        data : subscription
    }
}