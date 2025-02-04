import express from "express"
import {prisma } from "../db"
import { authMiddleware } from "../middleware/authMiddleware";
import { Create, findMany, Update} from "../repositories/ping";
import { findUniqueListing } from "../repositories/listing";
import { findUniqueUser } from "../repositories/auth";
import { CreatePing, UpdatePing, UserPing } from "../services/ping";
import { escapeLeadingUnderscores } from "typescript";
const router = express.Router();


router.post('/createping/:id' ,authMiddleware, async(req , res) : Promise<any> => {
    
        const {message} = req.body;
        const postId = req.params.id
        const userId = req.userId
        const ping = await CreatePing({message , postId, userId});
        if(ping.status == 422){
            return res.status(ping.status).json({
                message : ping.message
            })
        }
        if(ping.status == 411){
            return res.status(ping.status).json({
                message : ping.message
            })
        }
        return res.status(200).json({
            message : ping.message,
            ping: ping.ping
        })
    })

router.put('/update/:id' ,authMiddleware, async(req , res) : Promise<any> => {
    
        const {message} = req.body;
        const postId = req.params.id
        const userId = req.userId
        console.log(postId);
        console.log(userId);
       const updatePing = await UpdatePing({message , postId , userId})
       if(updatePing.status === 411){
        return res.status(updatePing.status).json({
            message : updatePing.message
        })
       }
       return res.status(updatePing.status).json({
        message  :updatePing.message
       })
})

router.get('/userpings' , authMiddleware,async ( req ,res) : Promise<any>  => {
    
        const userId = req.userId;
        const pings = await findMany(userId)
        const userPing = await UserPing(userId);
        if(userPing.status === 411){
            return res.status(userPing.status).json({
                message : userPing.message,
            })
        }
        return res.status(userPing.status).json({
            message : userPing.message,
            pings : userPing.pings
        })

    })


export default router