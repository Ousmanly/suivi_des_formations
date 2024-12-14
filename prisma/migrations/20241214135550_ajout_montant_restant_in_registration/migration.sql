/*
  Warnings:

  - Made the column `remainingAmount` on table `Registration` required. This step will fail if there are existing NULL values in that column.

*/

-- Mettre à jour toutes les valeurs NULL à 0
UPDATE "Registration" SET "remainingAmount" = 0 WHERE "remainingAmount" IS NULL;

-- Rendre la colonne obligatoire
ALTER TABLE "Registration" ALTER COLUMN "remainingAmount" SET NOT NULL;

-- AlterTable
ALTER TABLE "Registration" ALTER COLUMN "remainingAmount" SET NOT NULL,
ALTER COLUMN "remainingAmount" SET DEFAULT 0;
