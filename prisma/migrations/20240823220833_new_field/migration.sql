/*
  Warnings:

  - You are about to drop the column `descrition` on the `Url` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Url" DROP COLUMN "descrition",
ADD COLUMN     "description" TEXT;
