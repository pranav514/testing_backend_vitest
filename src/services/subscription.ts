import { CreateSubscriptionInterface } from "../interface/subscriptionInterface"
import { Create, CreateListingSubsripton, findUnique } from "../repositories/subscription"

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