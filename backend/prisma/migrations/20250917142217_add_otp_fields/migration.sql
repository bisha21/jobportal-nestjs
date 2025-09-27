/*
  Warnings:

  - You are about to drop the column `otp` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `otpExpiry` on the `Company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Company" DROP COLUMN "otp",
DROP COLUMN "otpExpiry";

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "otp" INTEGER,
ADD COLUMN     "otpExpiry" TIMESTAMP(3);
