/*
  Warnings:

  - Added the required column `image` to the `donations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "donations" ADD COLUMN     "image" TEXT NOT NULL;
