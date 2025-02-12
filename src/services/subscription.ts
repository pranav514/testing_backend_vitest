import { Create, findUnique } from "../repositories/subscription"

export const CreateSubscriptions = async ({userId , listingId} : any) => {
    const suscribed  = await findUnique({userId , listingId})
    if(suscribed){
        return {
            message : "You have already subscribed to this listing",
            status : 402,
        }
    }
    const subscription = await Create({userId , listingId})
    return {
        message : "Subscribed successfully",
        status : 200,
        data : subscription
    }
}