/*
  Warnings:

  - A unique constraint covering the columns `[furniture_id,variation_name]` on the table `variations` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "variations_variation_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "variations_furniture_id_variation_name_key" ON "variations"("furniture_id", "variation_name");
