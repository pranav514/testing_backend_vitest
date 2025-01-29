import express from "express"
import {prisma } from "../db"
import { authMiddleware } from "../middleware/authMiddleware";
import { C } from "vitest/dist/chunks/reporters.0x019-V2";
const router = express.Router();


router.post('/createping/:id' ,authMiddleware, async(req , res) : Promise<any> => {
    try{
        const {message} = req.body;
        const postId = req.params.id
        const userId = req.userId
        const ping = await prisma.ping.create({
            data : {
                message,
                postId,
                userId
            }
        })
        return res.status(200).json({
            message : "pinged sucessfully",
            ping
        })
        
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
        const ping = await prisma.ping.update({
         where : {
            id : pingId,
            userId : req.userId
         },
         data  :{
            message : message
         }
        })
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
        const pings = await prisma.ping.findMany({
            where : {
                userId : userId
            }
        })
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