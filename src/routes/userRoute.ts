import express, { Request, Response } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { CreateUser, SignIn, UpdateUser } from "../services/auth";
import { signin, signup, update } from "../controllers/auth";

const router = express.Router();
router.post(
  "/auth/signup",
  signup);

router.post(
  "/auth/signin",
  signin
);

router.put("/update", authMiddleware,update);
export default router;
