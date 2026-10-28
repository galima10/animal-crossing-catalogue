/*
  Warnings:

  - You are about to drop the column `monthly_avalaibility` on the `fishs` table. All the data in the column will be lost.
  - You are about to drop the column `monthly_avalaibility` on the `insects` table. All the data in the column will be lost.
  - You are about to drop the column `monthly_avalaibility` on the `sea_creatures` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "fishs" DROP COLUMN "monthly_avalaibility";

-- AlterTable
ALTER TABLE "insects" DROP COLUMN "monthly_avalaibility";

-- AlterTable
ALTER TABLE "sea_creatures" DROP COLUMN "monthly_avalaibility";
