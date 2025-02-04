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
import { CreateListing, DeleteListing, GetAll, GetUserSpecific, SpecificListing, UpdateListings } from "../services/lisiting";
import { createlisting, deletelisting, getlisting, specificlisting, updatelisting } from "../controllers/listing";
const router = express.Router();

router.post(
  "/createlisting",
  authMiddleware,
  createlisting
);

router.put("/update/:id", authMiddleware, updatelisting);

router.delete("/delete/:id", authMiddleware, deletelisting);

router.get("/getall", getlisting);


router.get(
  "/getlisting/:id",
  authMiddleware,
  async (req, res): Promise<any> => {
    
     
     
  }
);

router.get("/userlisting", authMiddleware, specificlisting);

export default router;
