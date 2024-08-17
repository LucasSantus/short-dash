/*
  Warnings:

  - You are about to drop the column `path` on the `Url` table. All the data in the column will be lost.
  - Added the required column `redirect` to the `Url` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `Url` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Url" DROP COLUMN "path",
ADD COLUMN     "redirect" TEXT NOT NULL,
ADD COLUMN     "token" TEXT NOT NULL;
