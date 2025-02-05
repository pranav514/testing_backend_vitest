import { app } from ".";
import { redisclient } from "./db";
app.listen(3000, async() => {
  await redisclient.connect();
  console.log("server started at the localhost");
});
