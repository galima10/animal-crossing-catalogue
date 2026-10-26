-- DropIndex
DROP INDEX "month_range_apparitions_fish_id_month_hemisphere_key";

-- DropIndex
DROP INDEX "month_range_apparitions_insect_id_month_hemisphere_key";

-- DropIndex
DROP INDEX "month_range_apparitions_sea_creature_id_month_hemisphere_key";

-- AlterTable
ALTER TABLE "month_range_apparitions" ADD COLUMN     "is_all_day" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "start_hour" SET DATA TYPE TEXT,
ALTER COLUMN "end_hour" SET DATA TYPE TEXT;

-- CreateIndex
CREATE INDEX "month_range_apparitions_insect_id_month_hemisphere_idx" ON "month_range_apparitions"("insect_id", "month", "hemisphere");

-- CreateIndex
CREATE INDEX "month_range_apparitions_fish_id_month_hemisphere_idx" ON "month_range_apparitions"("fish_id", "month", "hemisphere");

-- CreateIndex
CREATE INDEX "month_range_apparitions_sea_creature_id_month_hemisphere_idx" ON "month_range_apparitions"("sea_creature_id", "month", "hemisphere");
