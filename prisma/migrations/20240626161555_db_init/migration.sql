/*
  Warnings:

  - You are about to drop the column `service_tarif` on the `service` table. All the data in the column will be lost.
  - Added the required column `service_tariff` to the `service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "service" DROP COLUMN "service_tarif",
ADD COLUMN     "service_tariff" DOUBLE PRECISION NOT NULL;
