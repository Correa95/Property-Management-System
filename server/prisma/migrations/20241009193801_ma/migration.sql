/*
  Warnings:

  - You are about to drop the column `propertyId` on the `Unit` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Unit" DROP CONSTRAINT "Unit_propertyId_fkey";

-- AlterTable
ALTER TABLE "Unit" DROP COLUMN "propertyId";
