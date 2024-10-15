/*
  Warnings:

  - You are about to drop the column `propertyId` on the `Lease` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lease" DROP CONSTRAINT "Lease_propertyId_fkey";

-- AlterTable
ALTER TABLE "Lease" DROP COLUMN "propertyId";
