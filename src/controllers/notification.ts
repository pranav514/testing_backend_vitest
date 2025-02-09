import express, { Request, Response } from "express";
import { GetNotification } from "../services/notification";

export const GetNotifications = async(req: Request , res : Response) : Promise<any> => {
    const notification = await GetNotification(req.userId);
    if(notification.status == 404){
        return res.status(notification.status).json({
            message : notification.message
        })
    }
    return res.status(notification.status).json({
        message : notification.message,
        data : notification.data
    })
}