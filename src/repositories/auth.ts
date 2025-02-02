import express from "express";
import { prisma } from "../db";
import { authMiddleware } from "../middleware/authMiddleware";
import { User, UserUpdate } from "../interface/authInterface";



export const create  = async ({name,gender ,email, password, phone_number} : User) => {
    const User = await prisma.user.create({
        data : {
            name,
            gender,
            email,
            password,
            phone_number
        }
    })
    return User;
}

export const findUnique = async (email: string) => {
  const data = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return data;
};


export const Update  = async({name, password, phone_number , userId} : UserUpdate) => {
    const user = await prisma.user.update({
        where : {
            id : userId
        },
        data : {
            name,
            password,
            phone_number
        }
    })
    return user
}