/*
  Warnings:

  - You are about to drop the column `reminingAmount` on the `Payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "reminingAmount",
ADD COLUMN     "remainingAmount" DECIMAL(10,2);
