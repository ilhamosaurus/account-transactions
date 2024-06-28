/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `account` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "transaction_id_key";

-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "invoice_number" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "account_userId_key" ON "account"("userId");
