import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            userId: any;
        }
    }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("Authentication failed: No token provided");
    }
    const decodedToken = verify(token, "secret") as JwtPayload;
    console.log(decodedToken);
    if (!decodedToken) {
      res.status(401).json({
        error: "could not authenticate",
      });
    } else {
        req.userId = decodedToken;
      next();
    }
  } catch (error) {
    res.status(400).json({
      error: "error ocurred  in authentication",
    });
  }
};