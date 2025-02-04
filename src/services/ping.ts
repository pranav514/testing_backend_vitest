import { findUniqueUser } from "../repositories/auth"
import { Create, Update} from "../repositories/ping"
import { findMany, findUniqueListing } from "../repositories/listing";
import { Ping } from "../interface/pingInterface";


export const CreatePing = async ({message , postId , userId} : Ping) => {
        try{
            const listing = await findUniqueListing(postId)
            if(listing?.prefered_gender){
                const user = await findUniqueUser(userId)
                if(user?.gender == listing.prefered_gender){
                    const ping = await Create({message ,postId,userId})
                    return {
                        message : "pinged sucessfully",
                        status  : 200,
                        ping
                    }
                    
                }
                return {
                    message :  `${user?.gender} is not prefered for the following room`,
                    status : 422
                }
                
            }else{
                const ping = await Create({message ,postId,userId})
            return {
                message  :"pinged sucessfully",
                status : 200,
                ping
            }
            }
    
    
            
        }catch(error){
                return {
                    message  : "ping not succesfull",
                    status : 411,
                }
        }
}

export const UpdatePing = async({message , postId , userId} : Ping) => {
    try{
        const ping = await Update({message , postId , userId})
        return {
            message : "ping updated",
            status : 200
        }
    }catch(error){
        return {
            message : "cannot update the ping",
            status  : 411
        }
    }
}

export const UserPing = async (userId : string) => {
    try{
        const pings = await findMany(userId)
        return {
            message : "fetched the pings succesfully of the user ",
            status : 200,
            pings
        }
    }catch(error){
        return {
            message : "cannot fetched the ping of the user",
            status : 411
        }
    }
}