/*
  Warnings:

  - You are about to drop the `UrlAccess` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UrlAccess" DROP CONSTRAINT "UrlAccess_urlId_fkey";

-- DropForeignKey
ALTER TABLE "UrlAccess" DROP CONSTRAINT "UrlAccess_userId_fkey";

-- DropTable
DROP TABLE "UrlAccess";

-- CreateTable
CREATE TABLE "Historic" (
    "id" TEXT NOT NULL,
    "isAnonymous" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "urlId" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Historic_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Historic" ADD CONSTRAINT "Historic_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "Url"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Historic" ADD CONSTRAINT "Historic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
