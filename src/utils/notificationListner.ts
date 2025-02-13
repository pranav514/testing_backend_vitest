import { prisma } from "../db";
import { notificationEmitter } from "../eventemitter/notification";
import { GetTitle } from "../repositories/listing";
import { FindListingSuscribers, FindMany } from "../repositories/subscription";

export const notificationGenerator = notificationEmitter.on(
  "ListingCreated",
  async (listing: any) => {
    console.log("here");
    const subscribers = await FindMany();
    console.log(subscribers);
    for (const subscriber of subscribers) {
      console.log(subscriber);
      if(subscriber.location.find((location : string) => location === listing.location_city)){
              await prisma.notification.create({
        data: {
          userId: subscriber.userId,
          message: `New listing created: ${listing.title}`,
        },
      });
      }

    }
  }
);

export const specificlistingNotification = notificationEmitter.on("ListingUpdated" , async(listing : any) => {
    const subscribers = await FindListingSuscribers(listing.id);
    for(const subscriber of subscribers){
        await prisma.notification.create({
            data : {
                userId : subscriber.userId,
                message : `Listing updated : ${listing.title}`
            }
        })
    }
})
export const pingNotification =    notificationEmitter.on("PingCreated", async (ping: any) => {
  console.log("reached here");
  const postId = await ping.postId;
  const userId = await ping.userId;
  const postTitle = await GetTitle(postId);
  await prisma.notification.create({
    data: {
      userId,
      message: `user show interest on your post ${postTitle} listing you created `,
    },
  });
});
