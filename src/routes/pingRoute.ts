import express from "express"

import { authMiddleware } from "../middleware/authMiddleware";
import { createping, updateping, userping } from "../controllers/ping";

const router = express.Router();


router.post('/createping/:id' ,authMiddleware,createping)

router.put('/update/:id' ,authMiddleware, updateping)

router.get('/userpings' , authMiddleware,userping)


export default router