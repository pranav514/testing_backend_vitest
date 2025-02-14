import express from "express"

import { authMiddleware } from "../middleware/authMiddleware";
import { CreateListingSubscription, CreateSubscription, DeleteListingSubscription, DeleteSubscription } from "../controllers/subscription";
const router = express.Router();
router.post('/createsubscription' , authMiddleware , CreateSubscription);
router.post('/createlistingsubscription/:id' , authMiddleware , CreateListingSubscription);
router.delete('/deletesubscription' , authMiddleware , DeleteSubscription)
router.delete('/deletelistingsubscription' , authMiddleware , DeleteListingSubscription)
export default router