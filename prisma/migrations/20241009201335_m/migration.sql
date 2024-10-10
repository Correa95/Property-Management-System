/*
  Warnings:

  - Added the required column `unitNumber` to the `Lease` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lease" ADD COLUMN     "unitNumber" INTEGER NOT NULL;
