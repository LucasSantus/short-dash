/*
  Warnings:

  - The values [Expired] on the enum `LinkStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LinkStatus_new" AS ENUM ('Active', 'Inactive');
ALTER TABLE "urls" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "urls" ALTER COLUMN "status" TYPE "LinkStatus_new" USING ("status"::text::"LinkStatus_new");
ALTER TYPE "LinkStatus" RENAME TO "LinkStatus_old";
ALTER TYPE "LinkStatus_new" RENAME TO "LinkStatus";
DROP TYPE "LinkStatus_old";
ALTER TABLE "urls" ALTER COLUMN "status" SET DEFAULT 'Active';
COMMIT;
