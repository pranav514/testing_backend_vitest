import express from "express"

import { authMiddleware } from "../middleware/authMiddleware";
import { CreateListingSubscription, CreateSubscription, DeleteListingSubscription, DeleteSubscription, GetListingSuscribers } from "../controllers/subscription";
const router = express.Router();
router.post('/createsubscription' , authMiddleware , CreateSubscription);
router.post('/createlistingsubscription/:id' , authMiddleware , CreateListingSubscription);
router.delete('/unsuscribe' , authMiddleware , DeleteSubscription)
router.delete('/listingunsuscribe' , authMiddleware , DeleteListingSubscription)
router.get('/listingsuscribers/:id' , authMiddleware, GetListingSuscribers)
export default router