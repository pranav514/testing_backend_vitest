import express from "express";
import { prisma } from "../db";
import { authMiddleware } from "../middleware/authMiddleware";
import { isTemplateLiteralTypeNode } from "typescript";
const router = express.Router();

router.post(
  "/createlisting",
  authMiddleware,
  async (req, res): Promise<any> => {
    try {
      const { title, description, images, address, location_city }: any =
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
    const { title, description, images, address, location_city } = req.body;
    const listingId = req.params.id;
    const userId = req.userId;
    console.log(listingId);
    console.log(userId);
    const user = await prisma.listing.update({
      where: {
        id: listingId,
        userId: userId,
      },
      data: {
        title,
        description,
        images,
        address,
        location_city,
      },
    });
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
    const listing = await prisma.listing.findMany({
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
    return res.status(200).json({
      message: "all listings fetched successfully",
      listing,
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
