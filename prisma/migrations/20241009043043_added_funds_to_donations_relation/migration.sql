/*
  Warnings:

  - You are about to drop the column `ownerid` on the `funds` table. All the data in the column will be lost.
  - Added the required column `fundId` to the `donations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `funds` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "funds" DROP CONSTRAINT "funds_ownerid_fkey";

-- AlterTable
ALTER TABLE "donations" ADD COLUMN     "fundId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "funds" DROP COLUMN "ownerid",
ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "funds" ADD CONSTRAINT "funds_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_fundId_fkey" FOREIGN KEY ("fundId") REFERENCES "funds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
