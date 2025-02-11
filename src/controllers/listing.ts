
import express, { Request, Response } from "express";

import { CreateListing, DeleteListing, GetAll, GetUserSpecific, SpecificListing, UpdateListings } from "../services/lisiting";
import { EventEmitter } from "events";
import { notificationEmitter } from "../eventemitter/notification";
import { notificationGenerator, specificlistingNotification } from "../utils/notificationListner";
export const createlisting = async(req : Request , res : Response ) : Promise<any> => {
     const {
          title,
          description,
          images,
          rent,
          prefered_gender,
          address,
          location_city,
        }: any = req.body;
        const userId = req.userId;
        const listing = await CreateListing({
          title,
          description,
          images,
          rent,
          prefered_gender,
          address,
          location_city,
          userId,
        });
        if (listing.status === 402) {
          return res.status(listing.status).json({
            message: listing.message,
          });
          
        }
        if (listing.status === 411) { 
          return res.status(listing.status).json({
            message: listing.message,
          });
        }
        console.log("from the controller")
        notificationEmitter.emit("ListingCreated" , listing.data)
         notificationGenerator
        return res.status(listing.status).json({
          message: listing.message,
          listing: listing.data,
        });
}


export const updatelisting = async (req : Request , res : Response) : Promise<any> => {

        const {
          title,
          description,
          images,
          rent,
          prefered_gender,
          address,
          location_city,
        } = req.body;
        const listingId = req.params.id;
        const userId = req.userId;
        const updateListing = await UpdateListings({title,
          description,
          images,
          rent,
          prefered_gender,
          address,
          location_city,
          listingId,
          userId})
          
          if(updateListing.status === 411){
            return res.status(updateListing.status).json({
              message : updateListing.message,
            })
          }
          notificationEmitter.emit("ListingUpdated" , updateListing.data)
          specificlistingNotification
          return res.status(updateListing.status).json({
            message : updateListing.message,
            data: updateListing.data

          })
      
}

export const deletelisting = async(req : Request , res : Response) : Promise<any> => {
       const listingId = req.params.id;
        const userId = req.userId;
        const deleteListing  = await DeleteListing({listingId , userId});
        if(deleteListing.status === 411){
          return  res.status(deleteListing.status).json({
            message : "cannot delete the listing"
          })
        }
        return res.status(200).json({
          message : "listing deleted succesfully"
        }) 
}

export const getlisting = async(req : Request , res : Response) : Promise<any> => {
      
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;
    
        const listings = await GetAll({skip  , limit , page});
        if(listings.status === 411){
          return res.status(listings.status).json({
            message : listings.message
          })
        }
        return res.status(listings.status).json({
          message : listings.message,
          listings : listings.listing,
          pagination : listings.pagination
        })
}

export const specificlisting = async(req : Request , res : Response) : Promise<any> => {
     const listingId = req.params.id;
          const lisiting = await SpecificListing(listingId);
          if(lisiting.status === 411){
            return res.status(lisiting.status).json({
              message : lisiting.message
            })
          }
          return res.status(lisiting.status).json({
            message : lisiting.message,
          lisiting : lisiting.listing
          })
}