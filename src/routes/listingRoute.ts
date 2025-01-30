import express from "express";
import { prisma } from "../db";
import { authMiddleware } from "../middleware/authMiddleware";
const router = express.Router();

router.post(
  "/createlisting",
  authMiddleware,
  async (req, res): Promise<any> => {
    try {
      const { title, description, images,rent ,prefered_gender,  address, location_city }: any =
        req.body;
      const userId = req.userId;
      if (!title || !description || !address || !location_city) {
        return res.status(411).json({
          message: "some fields are missing",
        });
      }
      console.log(title);
      const lisiting = await prisma.listing.create({
        data: {
          title: title,
          description: description,
          images: images,
          rent : Number(rent),
          prefered_gender,
          address: address,
          location_city: location_city,
          userId: userId,
        },
      });
      return res.status(200).json({
        message: "listing added succesfully",
        lisiting,
      });
    } catch (error) {
      return res.status(411).json({
        message: "error occured while creating the listing",
      });
    }
  }
);

router.put("/update/:id", authMiddleware, async (req, res): Promise<any> => {
  try {
    const { title, description, images, rent,prefered_gender,address, location_city } = req.body;
    const listingId = req.params.id;
    const userId = req.userId;
    
    console.log(listingId);
    console.log(userId);
    const listing = await prisma.listing.update({
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
    });
    console.log(listing)
    return res.status(200).json({
      message: "listing updated succesfully",
    });
  } catch (error) {
    res.status(411).json({
      message: "error occured while updating the listings",
    });
  }
});

router.delete("/delete/:id", authMiddleware, async (req, res): Promise<any> => {
  try {
    const listingId = req.params.id;
    const userId = req.userId;
    const listing = await prisma.listing.delete({
      where: {
        id: listingId,
        userId: userId,
      },
    });
    return res.status(200).json({
      message: "listing deleted succesfully",
    });
  } catch (error) {
    return res.status(411).json({
      message: "cannot delete the listing",
    });
  }
});

router.get("/getall", async (req, res): Promise<any> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const listing = await prisma.listing.findMany({
      skip : skip,
      take : limit,
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
    const totalCount = await prisma.listing.count();
    const totalPage = Math.ceil(totalCount/limit);
    return res.status(200).json({
      message: "all listings fetched successfully",
      listing,
      pagination : {
        currentPage : page,
        totalPage : totalPage,
        totalItems : totalCount,
        itemsPerPage : limit
      }
    });
  } catch (error) {
    return res.status(411).json({
      message: "cannot fetched all the blogs",
    });
  }
});

router.get(
  "/getlisting/:id",
  authMiddleware,
  async (req, res): Promise<any> => {
    try {
      const listingId = req.params.id;
    //   console.log(listingId);
      const listing = await prisma.listing.findUnique({
        where: {
          id: listingId,
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
              phone_number: true,
            },
          },
        },
      });
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

router.get('/userlisting' ,authMiddleware,async (req  ,res) : Promise<any> => {
    try{
            const userId  = req.userId
            console.log('userId' , userId)
    const listing = await prisma.listing.findMany({
        where : {
            userId : userId
        }
    })
    console.log(listing)
    return res.status(200).json({
        message : `fetched the blog of the user ${userId}`,
        listing

    })
    }catch(error){
        res.status(411).json({
            message : "cannot fetched the blog"
        })
    }

})

export default router;
