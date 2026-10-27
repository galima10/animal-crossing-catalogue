/*
  Warnings:

  - You are about to drop the column `indect_location_id` on the `insects` table. All the data in the column will be lost.
  - Added the required column `insect_location_id` to the `insects` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "insects" DROP CONSTRAINT "insects_indect_location_id_fkey";

-- AlterTable
ALTER TABLE "insects" DROP COLUMN "indect_location_id",
ADD COLUMN     "insect_location_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "insects" ADD CONSTRAINT "insects_insect_location_id_fkey" FOREIGN KEY ("insect_location_id") REFERENCES "insect_locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
