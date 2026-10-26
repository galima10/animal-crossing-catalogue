/*
  Warnings:

  - The values [JANUARY,FEBRUARY,MARCH,APRIL,JUNE,JULY,AUGUST,SEPTEMBER,OCTOBER,NOVEMBER,DECEMBER] on the enum `Month` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Month_new" AS ENUM ('JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC');
ALTER TABLE "month_range_apparitions" ALTER COLUMN "month" TYPE "Month_new" USING ("month"::text::"Month_new");
ALTER TYPE "Month" RENAME TO "Month_old";
ALTER TYPE "Month_new" RENAME TO "Month";
DROP TYPE "Month_old";
COMMIT;
