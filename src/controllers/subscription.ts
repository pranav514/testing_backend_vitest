import express, { Request, Response } from "express";
import { CreateSubscriptions } from "../services/subscription";

export const CreateSubscription = async(req: Request , res : Response) : Promise<any> => {
    const listingId = req.params.id
    const userId = req.userId
    const subscription = await CreateSubscriptions({userId , listingId});
    if(subscription.status == 402){
        return res.status(subscription.status).json({
            message : subscription.message
        })
    }
    return res.status(subscription.status).json({
        message : subscription.message,
        data : subscription.data
    })
}