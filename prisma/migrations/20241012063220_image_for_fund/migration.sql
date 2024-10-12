/*
  Warnings:

  - Added the required column `image` to the `funds` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "funds" ADD COLUMN     "image" TEXT NOT NULL;
