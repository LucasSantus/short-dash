/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Url` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Url` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Url" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Url_code_key" ON "Url"("code");
