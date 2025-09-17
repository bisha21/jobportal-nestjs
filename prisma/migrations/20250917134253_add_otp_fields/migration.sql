/*
  Warnings:

  - Added the required column `otp` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `otpExpiry` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Company" ADD COLUMN     "otp" INTEGER NOT NULL,
ADD COLUMN     "otpExpiry" TIMESTAMP(3) NOT NULL;
