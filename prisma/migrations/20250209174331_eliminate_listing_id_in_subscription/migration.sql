/*
  Warnings:

  - You are about to drop the column `listingId` on the `Subscription` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_listingId_fkey";

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "listingId";
