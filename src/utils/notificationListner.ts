import { prisma } from "../db";
import { notificationEmitter } from "../eventemitter/notification";

notificationEmitter.on("ListingCreated", async (listing: any) => {
    console.log("here")
  const subscribers = await prisma.subscription.findMany({
    where: { listingId: listing.id },
    include: { user: true },
  });

  for (const subscriber of subscribers) {
    console.log(subscriber);
    await prisma.notification.create({
      data: {
        userId: subscriber.userId,
        message: `New listing created: ${listing.title}`,
      },
    });
  }
});
