import express from "express"
import { prisma } from "../db"
import { authMiddleware } from "../middleware/authMiddleware";
const router = express.Router();



export default router