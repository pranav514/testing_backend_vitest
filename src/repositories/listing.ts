import express from "express";
import { prisma } from "../db";
import { authMiddleware } from "../middleware/authMiddleware";
import  {CreateListing, Pagination, UpdateListing}  from "../interface/listingInterface";
import { DeleteListingInterface } from "../interface/authInterface";


export const Create =async ({title , description , images , rent  , prefered_gender , address , location_city , userId} : CreateListing) => {
    const listing = await prisma.listing.create({
        data : {
            title: title,
            description: description,
            images: images,
            rent : Number(rent),
            prefered_gender,
            address: address,
            location_city: location_city,
            userId: userId,
        }
    })
    return listing;
}

export const Update = async ({title , description , images, rent, prefered_gender , address , location_city , listingId , userId} : UpdateListing) => {
    const updateListing = await prisma.listing.update({
        where: {
            id: listingId,
            userId: userId,
          },
          data: {
            title,
            description,
            images,
            ...(rent !== undefined ? { rent: Number(rent) } : {}),
            prefered_gender,
            address,
            location_city,
          },
    })
    return updateListing;
}

export const getAll = async({skip , limit} : Pagination) => {
    const listing = await prisma.listing.findMany({
        skip : Number(skip),
        take : Number(limit),
        include: {  
          user: {
            select: {
              name: true,
              email: true,
              phone_number: true,
            },
          },
          pings : {
            select : {
              message : true,
              userId : true,
              createdAt : true,
            }
          }
        },
      });
      return listing
}   

export const Count = async()  => {
    const count = await prisma.listing.count();
    return count;
}

export const findUnique = async (listingId : string) => {
        const lisiting  = await prisma.listing.findUnique({
            where : {
                id : listingId
            },
            include : {
                user : {
                    select  :{ 
                        name : true,
                        email : true,
                        phone_number : true
                    }
                }
            }
        })
        return lisiting
}


export const findMany = async(userId : string) => {
    const listing = await prisma.listing.findMany({
        where : {
            userId : userId
        }
    })
    return listing
}


export const findUniqueListing = async (postId : string)  => {
    const listing = await prisma.listing.findUnique({
        where : {
            id : postId
        },
        select : {
            prefered_gender : true
        }
    })
    return listing
}

export const deleteListing = async ({listingId , userId} : DeleteListingInterface) => {
    const listing = await prisma.listing.delete({
        where: {
          id: listingId,
          userId: userId,
        },
      });
      return listing
}

export const GetTitle = async (postId : string) => {
    const listing = await prisma.listing.findUnique({
        where : {
            id : postId
        }
    })
    return listing?.title
}
