import express from "express"

import { authMiddleware } from "../middleware/authMiddleware";
import { GetNotifications } from "../controllers/notification";
const router = express.Router();
router.get('/getnotification',authMiddleware , GetNotifications);
export default router