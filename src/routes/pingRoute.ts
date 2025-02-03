import express from "express"
import {prisma } from "../db"
import { authMiddleware } from "../middleware/authMiddleware";
import { Create, findMany, Update} from "../repositories/ping";
import { findUniqueListing } from "../repositories/listing";
import { findUniqueUser } from "../repositories/auth";
const router = express.Router();


router.post('/createping/:id' ,authMiddleware, async(req , res) : Promise<any> => {
    try{
        const {message} = req.body;
        const postId = req.params.id
        const userId = req.userId
        const listing = await findUniqueListing(postId)
        if(listing?.prefered_gender){
            const user = await findUniqueUser(userId)
            if(user?.gender == listing.prefered_gender){
                const ping = await Create({message ,postId,userId})
                return res.status(200).json({
                    message : "pinged sucessfully",
                    ping
                })
                
            }
            return res.status(422).json({
                message : `${user?.gender} is not prefered for the following room`
            })
            
        }else{
            const ping = await Create({message ,postId,userId})
        return res.status(200).json({
            message : "pinged sucessfully",
            ping
        })
        }


        
    }catch(error){
            res.status(411).json({
                message : "ping not succesfull"
            })
    }

})

router.put('/update/:id' ,authMiddleware, async(req , res) : Promise<any> => {
    try{
        const {message} = req.body;
        const pingId = req.params.id
        const userId = req.userId
        const ping = await Update({message , pingId , userId})
        return res.status(200).json({
            message : "ping updated"
        })
    }catch(error){
        return res.status(411).json({
            message : "cannot update the ping"
        })
    }
})

router.get('/userpings' , authMiddleware,async ( req ,res) : Promise<any>  => {
    try{
        const userId = req.userId;
        const pings = await findMany(userId)
        return res.status(200).json({
            message : "fetched the pings succesfully of the user ",
            pings
        })
    }catch(error){
        return res.status(411).json({
            message : "cannot fetched the ping of the user"
        })
    }
})


export default router