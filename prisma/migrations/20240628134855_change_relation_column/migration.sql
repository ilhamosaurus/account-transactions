/*
  Warnings:

  - You are about to drop the column `userId` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `accountId` on the `transaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `account_id` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_userId_fkey";

-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_accountId_fkey";

-- DropIndex
DROP INDEX "account_userId_key";

-- AlterTable
ALTER TABLE "account" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "accountId",
ADD COLUMN     "account_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "account_user_id_key" ON "account"("user_id");

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
