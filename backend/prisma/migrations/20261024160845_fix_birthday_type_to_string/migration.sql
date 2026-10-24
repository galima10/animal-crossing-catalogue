/*
  Warnings:

  - Added the required column `gender` to the `villagers` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "villagers" ADD COLUMN     "gender" "Gender" NOT NULL,
ALTER COLUMN "birthday" SET DATA TYPE TEXT;
