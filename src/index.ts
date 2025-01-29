import express from "express";
import userRoute from "./routes/userRoute";
import listingRoute from "./routes/listingRoute";
export const app = express();
app.use(express.json());

app.use('/api/v1/user' , userRoute)
app.use('/api/v1/listing' , listingRoute)
