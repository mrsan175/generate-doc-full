/*
  Warnings:

  - You are about to alter the column `otp` on the `otp` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(6)`.
  - A unique constraint covering the columns `[otp]` on the table `otp` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "otp" ADD COLUMN     "isValid" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "otp" SET DATA TYPE VARCHAR(6);

-- CreateIndex
CREATE UNIQUE INDEX "otp_otp_key" ON "otp"("otp");
