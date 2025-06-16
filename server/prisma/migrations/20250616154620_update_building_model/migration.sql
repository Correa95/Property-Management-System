/*
  Warnings:

  - A unique constraint covering the columns `[complexId,buildingNumber]` on the table `Building` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Building_complexId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Building_complexId_buildingNumber_key" ON "Building"("complexId", "buildingNumber");
