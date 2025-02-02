import express, { Request, Response } from "express";
import { prisma } from "../db";
import { sign } from "jsonwebtoken";
import { authMiddleware } from "../middleware/authMiddleware";
import { isTemplateLiteralTypeNode } from "typescript";
import { create, findUnique, Update } from "../repositories/auth";
const router = express.Router();
router.post(
  "/auth/signup",
  async (req: Request, res: Response): Promise<any> => {
    console.log("request recived");
    console.log("Received request at /api/v1/auth/signup");

    const { name, gender, email, password, phone_number } = req.body;

    console.log("name", name);
    console.log("email", email);
    console.log("password", password);
    console.log("phone_number", phone_number);
    if (!name || !email || !password) {
      return res.status(411).json({
        message:
          "enter the necessary fields which are name, email and password",
      });
    }

    try {
      const user = await create({
        name,
        gender,
        email,
        password,
        phone_number,
      });

      res.status(200).json({
        message: "user created successfully",
        user,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({
        message: "An error occurred while creating the user",
      });
    }
  }
);

router.post(
  "/auth/signin",
  async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;
    const user = await findUnique(email);
    console.log(user);
    if (!user) {
      return res.status(411).json({
        message: "no user exist cannot login",
      });
    }

    if (user.password != password) {
      return res.status(411).json({
        message: "incorrect password",
      });
    }
    const token = sign(user.id, "secret");
    return res.status(200).json({
      message: "user logged in sucessfully",
      token,
    });
  }
);

router.put("/update", authMiddleware, async (req, res): Promise<any> => {
  try {
    const { name, password, phone_number  } = req.body;
    const userId = req.userId;
    if (!userId) {
      return res.status(411).json({
        message: "userId is not present",
      });
    }
    const user = await Update({name ,password , phone_number , userId});
    return res.status(200).json({
      message: "user updated Sucessfully",
      user,
    });
  } catch (error) {
    res.status(411).json({
      message: "error while updating the user",
    });
  }
});
export default router;
