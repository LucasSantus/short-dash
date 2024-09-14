/*
  Warnings:

  - You are about to drop the column `shortUrl` on the `urls` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "urls_shortUrl_key";

-- AlterTable
ALTER TABLE "urls" DROP COLUMN "shortUrl";
