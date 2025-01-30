/*
  Warnings:

  - You are about to drop the column `Gender` on the `User` table. All the data in the column will be lost.
  - Added the required column `rent` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "rent" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "Gender",
ADD COLUMN     "gender" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Gender";
