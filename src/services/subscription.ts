import { Create, CreateListingSubsripton, findUnique } from "../repositories/subscription"

export const CreateSubscriptions = async (userId : string) => {
    const suscribed  = await findUnique(userId )
    if(suscribed){
        return {
            message : "You have already subscribed to this listing",
            status : 402,
        }
    }
    const subscription = await Create(userId )
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