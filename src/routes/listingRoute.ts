import express from "express";
import { prisma } from "../db";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  Count,
  Create,
  deleteListing,
  findUnique,
  getAll,
  Update,
} from "../repositories/listing";
import { CreateListing, DeleteListing, GetAll, UpdateListings } from "../services/lisiting";
const router = express.Router();

router.post(
  "/createlisting",
  authMiddleware,
  async (req, res): Promise<any> => {
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
    return res.status(listing.status).json({
      message: listing.message,
      listing: listing.data,
    });
  }
);

router.put("/update/:id", authMiddleware, async (req, res): Promise<any> => {
  
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
          message : updateListing.message
        })
      }
      return res.status(updateListing.status).json({
        message : updateListing.message
      })
  

});

router.delete("/delete/:id", authMiddleware, async (req, res): Promise<any> => {
  
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
});

router.get("/getall", async (req, res): Promise<any> => {
  
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
  
});

router.get(
  "/getlisting/:id",
  authMiddleware,
  async (req, res): Promise<any> => {
    try {
      const listingId = req.params.id;
      const listing = await findUnique(listingId);
      console.log(listing);
      return res.status(200).json({
        message: "fetched the specific listing",
        listing,
      });
    } catch (error) {
      return res.status(411).json({
        message: "cannot fetched the listing",
      });
    }
  }
);

router.get("/userlisting", authMiddleware, async (req, res): Promise<any> => {
  try {
    const userId = req.userId;
    console.log("userId", userId);
    const listing = await prisma.listing.findMany({
      where: {
        userId: userId,
      },
    });
    console.log(listing);
    return res.status(200).json({
      message: `fetched the blog of the user ${userId}`,
      listing,
    });
  } catch (error) {
    res.status(411).json({
      message: "cannot fetched the blog",
    });
  }
});

export default router;
