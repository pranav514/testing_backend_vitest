import express, { Request, Response } from "express";;
import { authMiddleware } from "../middleware/authMiddleware";
import { CreateUser, SignIn, UpdateUser } from "../services/auth";

const router = express.Router();
router.post(
  "/auth/signup",
  async (req: Request, res: Response): Promise<any> => {
    console.log("request recived");
    console.log("Received request at /api/v1/auth/signup");

    const { name, gender, email, password, phone_number } = req.body;
    const createuser = await  CreateUser({name, gender, email, password, phone_number})
    if(createuser.status == 411){
      return res.status(411).json({
        message : createuser.message
      })

    }
    if(createuser.status === 500){
      return res.status(500).json({
        messsage : createuser.message
      })
    }
    return res.status(200).json({
      message : createuser.message,
      user : createuser.data
    })
});

router.post(
  "/auth/signin",
  async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;
    const data = await SignIn({email ,password})
    if(data.status == 402){
      return res.status(402).json({
        message : data.message
      })
    }
    if(data.status == 411){
      return res.status(411).json({
        message : data.message
      })
    }
    return res.status(200).json({
      message : data.message,
      token : data.data
    })
  }
);

router.put("/update", authMiddleware, async (req, res): Promise<any> => {
    const { name, password, phone_number  } = req.body;
    const userId = req.userId;
    const updatedUser = await UpdateUser({name , password,phone_number , userId});
    if(updatedUser.status == 402){
      return res.status(updatedUser.status).json({
        message : updatedUser.message,
      })
    }
    if(updatedUser.status === 411){
      return res.status(updatedUser.status).json({
        message : updatedUser.message
      })
    }
    return res.status(updatedUser.status).json({
      message : updatedUser.message,
      user : updatedUser.user
    })
    
});
export default router;
