/*
  Warnings:

  - Made the column `roleMasterId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "PresenceStatus" AS ENUM ('PRESENT', 'ABSENT', 'NOT_STARTED');

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roleMasterId_fkey";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "presence" "PresenceStatus" NOT NULL DEFAULT 'NOT_STARTED';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "roleMasterId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleMasterId_fkey" FOREIGN KEY ("roleMasterId") REFERENCES "RoleMaster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
