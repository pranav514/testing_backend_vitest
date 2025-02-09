import express from "express";
import userRoute from "./routes/userRoute";
import listingRoute from "./routes/listingRoute";
import pingRoute from "./routes/pingRoute";
import subscriptionRoute from "./routes/subscriptionRoute";
import notificationRoute from "./routes/notificationRoute";
export const app = express();
app.use(express.json());

app.use('/api/v1/user' , userRoute)
app.use('/api/v1/listing' , listingRoute)
app.use('/api/v1/ping' , pingRoute)
app.use('/api/v1/notification_service' , subscriptionRoute)
app.use('/api/v1/notification' ,notificationRoute )
 