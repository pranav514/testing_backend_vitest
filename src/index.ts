import express from "express";
import userRoute from "./routes/authRoute";
export const app = express();
app.use(express.json());

app.use('/api/v1/auth' , userRoute)