import express, { Request, Response } from "express";
import { CreateSubscriptionLisiting, CreateSubscriptions, DeleteListingSubscriptions, DeleteSubscriptions } from "../services/subscription";

export const CreateSubscription = async(req: Request , res : Response) : Promise<any> => {
    const userId = req.userId
    const location = req.body.location
    const subscription = await CreateSubscriptions({userId , location});
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

export const CreateListingSubscription = async(req: Request , res : Response) : Promise<any> => {
    const listingId = req.params.id
    const userId = req.userId
    const subscription = await CreateSubscriptionLisiting(userId,listingId);
    return res.status(subscription.status).json({
        message : subscription.message,
        data : subscription.data
    })
}

export const DeleteSubscription = async (req : Request , res : Response) : Promise<any> => {
    const userId = req.userId
    const subscription = await DeleteSubscriptions(userId);
    if(subscription.status == 404){
        return res.status(subscription.status).json({
            message : subscription.message
        })
    }
    
    return res.status(subscription.status).json({
        message : subscription.message,
        data : subscription.data
    })
}

export const DeleteListingSubscription = async (req : Request , res : Response) : Promise<any> => {
    const userId = req.userId
    const subscription = await DeleteListingSubscriptions(userId);
    if(subscription.status == 404){
        return res.status(subscription.status).json({
            message : subscription.message
        })
    }
    return res.status(subscription.status).json({
        message : subscription.message,
        data : subscription.data
    })
}