-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('STUDENT', 'AUTHOR', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'STUDENT';
