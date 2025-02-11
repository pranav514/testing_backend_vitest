-- CreateTable
CREATE TABLE "ListingNotifySubscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,

    CONSTRAINT "ListingNotifySubscription_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ListingNotifySubscription" ADD CONSTRAINT "ListingNotifySubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListingNotifySubscription" ADD CONSTRAINT "ListingNotifySubscription_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
