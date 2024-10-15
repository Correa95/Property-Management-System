/*
  Warnings:

  - The values [COMPLETED] on the enum `MaintenanceStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [COMPLETED] on the enum `PaymentStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `leaseEndDate` on the `Lease` table. All the data in the column will be lost.
  - You are about to drop the column `leaseStartDate` on the `Lease` table. All the data in the column will be lost.
  - You are about to drop the column `leaseStatus` on the `Lease` table. All the data in the column will be lost.
  - You are about to drop the column `monthlyRent` on the `Lease` table. All the data in the column will be lost.
  - You are about to drop the column `unitNumber` on the `Lease` table. All the data in the column will be lost.
  - You are about to drop the column `completedAt` on the `MaintenanceRequest` table. All the data in the column will be lost.
  - You are about to drop the column `method` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Tenant` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Tenant` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Tenant` table. All the data in the column will be lost.
  - You are about to drop the column `available` on the `Unit` table. All the data in the column will be lost.
  - You are about to drop the column `buildingNumber` on the `Unit` table. All the data in the column will be lost.
  - You are about to drop the column `rent` on the `Unit` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[unitId]` on the table `Lease` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tenantId]` on the table `Lease` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[unitNumber]` on the table `Unit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `endDate` to the `Lease` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rentAmount` to the `Lease` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Lease` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adminId` to the `MaintenanceRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentType` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adminId` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Tenant` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone` on table `Tenant` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `rentAmount` to the `Unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Unit` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Unit` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('CREDIT_CARD', 'BANK_TRANSFER', 'CASH', 'CHECK');

-- CreateEnum
CREATE TYPE "UnitStatus" AS ENUM ('AVAILABLE', 'LEASED', 'UNDER_MAINTENANCE');

-- AlterEnum
BEGIN;
CREATE TYPE "MaintenanceStatus_new" AS ENUM ('PENDING', 'IN_PROGRESS', 'RESOLVED', 'REJECTED');
ALTER TABLE "MaintenanceRequest" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "MaintenanceRequest" ALTER COLUMN "status" TYPE "MaintenanceStatus_new" USING ("status"::text::"MaintenanceStatus_new");
ALTER TYPE "MaintenanceStatus" RENAME TO "MaintenanceStatus_old";
ALTER TYPE "MaintenanceStatus_new" RENAME TO "MaintenanceStatus";
DROP TYPE "MaintenanceStatus_old";
ALTER TABLE "MaintenanceRequest" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PaymentStatus_new" AS ENUM ('PENDING', 'PAID', 'FAILED');
ALTER TABLE "Payment" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Payment" ALTER COLUMN "paymentStatus" TYPE "PaymentStatus_new" USING ("paymentStatus"::text::"PaymentStatus_new");
ALTER TYPE "PaymentStatus" RENAME TO "PaymentStatus_old";
ALTER TYPE "PaymentStatus_new" RENAME TO "PaymentStatus";
DROP TYPE "PaymentStatus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "MaintenanceRequest" DROP CONSTRAINT "MaintenanceRequest_tenantId_fkey";

-- AlterTable
ALTER TABLE "Lease" DROP COLUMN "leaseEndDate",
DROP COLUMN "leaseStartDate",
DROP COLUMN "leaseStatus",
DROP COLUMN "monthlyRent",
DROP COLUMN "unitNumber",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "rentAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "MaintenanceRequest" DROP COLUMN "completedAt",
ADD COLUMN     "adminId" INTEGER NOT NULL,
ADD COLUMN     "resolutionDate" TIMESTAMP(3),
ALTER COLUMN "tenantId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "method",
DROP COLUMN "status",
ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PAID',
ADD COLUMN     "paymentType" "PaymentType" NOT NULL,
ADD COLUMN     "unitId" INTEGER NOT NULL,
ALTER COLUMN "paymentDate" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "city",
DROP COLUMN "state",
DROP COLUMN "zipCode",
ADD COLUMN     "adminId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Tenant" DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "role",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "phone" SET NOT NULL;

-- AlterTable
ALTER TABLE "Unit" DROP COLUMN "available",
DROP COLUMN "buildingNumber",
DROP COLUMN "rent",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "rentAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "status" "UnitStatus" NOT NULL DEFAULT 'AVAILABLE',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "unitNumber" SET DATA TYPE TEXT,
ALTER COLUMN "description" SET NOT NULL;

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "InvoiceStatus";

-- DropEnum
DROP TYPE "LeaseStatus";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Lease_unitId_key" ON "Lease"("unitId");

-- CreateIndex
CREATE UNIQUE INDEX "Lease_tenantId_key" ON "Lease"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "Unit_unitNumber_key" ON "Unit"("unitNumber");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceRequest" ADD CONSTRAINT "MaintenanceRequest_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceRequest" ADD CONSTRAINT "MaintenanceRequest_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
