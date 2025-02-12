import express from "express"

import { authMiddleware } from "../middleware/authMiddleware";
import { CreateSubscription } from "../controllers/subscription";
const router = express.Router();
router.post('/createsubscription/:id' , authMiddleware , CreateSubscription);
export default router