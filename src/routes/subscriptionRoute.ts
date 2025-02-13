import express from "express"

import { authMiddleware } from "../middleware/authMiddleware";
import { CreateListingSubscription, CreateSubscription } from "../controllers/subscription";
const router = express.Router();
router.post('/createsubscription' , authMiddleware , CreateSubscription);
router.post('/createlistingsubscription/:id' , authMiddleware , CreateListingSubscription);
export default router