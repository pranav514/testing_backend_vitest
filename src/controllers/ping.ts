import { findMany } from "../repositories/ping";

import express, { Request, Response } from "express";
import { CreatePing, UpdatePing, UserPing } from "../services/ping";
import { notificationEmitter } from "../eventemitter/notification";
import { pingNotification } from "../utils/notificationListner";
export const createping = async (req: Request, res: Response): Promise<any> => {
  const { message } = req.body;
  const postId = req.params.id;
  const userId = req.userId;
  const ping = await CreatePing({ message, postId, userId });
  if (ping.status == 422) {
    return res.status(ping.status).json({
      message: ping.message,
    });
  }
  if (ping.status == 411) {
    return res.status(ping.status).json({
      message: ping.message,
    });
  }
  notificationEmitter.emit("PingCreated", ping.ping);
  pingNotification;
  return res.status(200).json({
    message: ping.message,
    ping: ping.ping,
  });
};

export const updateping = async (req: Request, res: Response): Promise<any> => {
  const { message } = req.body;
  const postId = req.params.id;
  const userId = req.userId;
  console.log(postId);
  console.log(userId);
  const updatePing = await UpdatePing({ message, postId, userId });
  if (updatePing.status === 411) {
    return res.status(updatePing.status).json({
      message: updatePing.message,
    });
  }
  return res.status(updatePing.status).json({
    message: updatePing.message,
  });
};

export const userping = async (req: Request, res: Response): Promise<any> => {
  const userId = req.userId;
  const pings = await findMany(userId);
  const userPing = await UserPing(userId);
  if (userPing.status === 411) {
    return res.status(userPing.status).json({
      message: userPing.message,
    });
  }
  return res.status(userPing.status).json({
    message: userPing.message,
    pings: userPing.pings,
  });
};
