/*
  Warnings:

  - Added the required column `images` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "images" TEXT NOT NULL;
