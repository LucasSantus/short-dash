/*
  Warnings:

  - You are about to drop the column `numberOfVisitors` on the `Url` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Url" DROP COLUMN "numberOfVisitors",
ADD COLUMN     "amountOfAccesses" INTEGER NOT NULL DEFAULT 0;
