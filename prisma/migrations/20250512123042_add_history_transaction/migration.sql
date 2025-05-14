/*
  Warnings:

  - The `status` column on the `HistoryTransaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StatusTransaction" AS ENUM ('PAID', 'PENDING', 'CANCEL');

-- AlterTable
ALTER TABLE "HistoryTransaction" DROP COLUMN "status",
ADD COLUMN     "status" "StatusTransaction" NOT NULL DEFAULT 'PENDING';
