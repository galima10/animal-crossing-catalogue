-- CreateEnum
CREATE TYPE "Weather" AS ENUM ('ANY_EXCEPT_RAIN', 'ANY_WEATHER');

-- CreateEnum
CREATE TYPE "Month" AS ENUM ('JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER');

-- CreateEnum
CREATE TYPE "Hemisphere" AS ENUM ('SOUTH', 'NORTH');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('INTERIOR_STRUCTURE', 'CEILING_DECOR', 'WALL_MOUNTED');

-- CreateTable
CREATE TABLE "species" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "species_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "personnalities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "personnalities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "villagers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "species_id" TEXT NOT NULL,
    "personnality_id" TEXT NOT NULL,

    CONSTRAINT "villagers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "insect_locations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "insect_locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "insects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "selling_price" DECIMAL(65,30) NOT NULL,
    "monthly_avalaibility" INTEGER NOT NULL,
    "weather" "Weather" NOT NULL,
    "indect_location_id" TEXT NOT NULL,

    CONSTRAINT "insects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sea_places" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "sea_places_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fishs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "selling_price" DECIMAL(65,30) NOT NULL,
    "monthly_avalaibility" INTEGER NOT NULL,
    "sea_place_id" TEXT NOT NULL,

    CONSTRAINT "fishs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sea_creatures" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "selling_price" DECIMAL(65,30) NOT NULL,
    "monthly_avalaibility" INTEGER NOT NULL,

    CONSTRAINT "sea_creatures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "month_range_apparitions" (
    "id" TEXT NOT NULL,
    "month" "Month" NOT NULL,
    "start_hour" TIMESTAMP(3) NOT NULL,
    "end_hour" TIMESTAMP(3) NOT NULL,
    "hemisphere" "Hemisphere" NOT NULL,
    "insect_id" TEXT,
    "fish_id" TEXT,
    "sea_creature_id" TEXT,

    CONSTRAINT "month_range_apparitions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "furnitures" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "image_url" TEXT NOT NULL,
    "buying_price" DECIMAL(65,30),
    "selling_price" DECIMAL(65,30),

    CONSTRAINT "furnitures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "variations" (
    "id" TEXT NOT NULL,
    "variation_name" TEXT NOT NULL,
    "variation_image_url" TEXT NOT NULL,
    "furniture_id" TEXT NOT NULL,

    CONSTRAINT "variations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "species_name_key" ON "species"("name");

-- CreateIndex
CREATE INDEX "species_name_idx" ON "species"("name");

-- CreateIndex
CREATE UNIQUE INDEX "personnalities_name_key" ON "personnalities"("name");

-- CreateIndex
CREATE INDEX "personnalities_name_idx" ON "personnalities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "villagers_name_key" ON "villagers"("name");

-- CreateIndex
CREATE INDEX "villagers_name_idx" ON "villagers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "insect_locations_name_key" ON "insect_locations"("name");

-- CreateIndex
CREATE INDEX "insect_locations_name_idx" ON "insect_locations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "insects_name_key" ON "insects"("name");

-- CreateIndex
CREATE INDEX "insects_name_idx" ON "insects"("name");

-- CreateIndex
CREATE UNIQUE INDEX "sea_places_name_key" ON "sea_places"("name");

-- CreateIndex
CREATE INDEX "sea_places_name_idx" ON "sea_places"("name");

-- CreateIndex
CREATE UNIQUE INDEX "fishs_name_key" ON "fishs"("name");

-- CreateIndex
CREATE INDEX "fishs_name_idx" ON "fishs"("name");

-- CreateIndex
CREATE UNIQUE INDEX "sea_creatures_name_key" ON "sea_creatures"("name");

-- CreateIndex
CREATE INDEX "sea_creatures_name_idx" ON "sea_creatures"("name");

-- CreateIndex
CREATE UNIQUE INDEX "month_range_apparitions_insect_id_month_hemisphere_key" ON "month_range_apparitions"("insect_id", "month", "hemisphere");

-- CreateIndex
CREATE UNIQUE INDEX "month_range_apparitions_fish_id_month_hemisphere_key" ON "month_range_apparitions"("fish_id", "month", "hemisphere");

-- CreateIndex
CREATE UNIQUE INDEX "month_range_apparitions_sea_creature_id_month_hemisphere_key" ON "month_range_apparitions"("sea_creature_id", "month", "hemisphere");

-- CreateIndex
CREATE UNIQUE INDEX "furnitures_name_key" ON "furnitures"("name");

-- CreateIndex
CREATE INDEX "furnitures_name_idx" ON "furnitures"("name");

-- CreateIndex
CREATE UNIQUE INDEX "variations_variation_name_key" ON "variations"("variation_name");

-- CreateIndex
CREATE INDEX "variations_variation_name_idx" ON "variations"("variation_name");

-- AddForeignKey
ALTER TABLE "villagers" ADD CONSTRAINT "villagers_species_id_fkey" FOREIGN KEY ("species_id") REFERENCES "species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "villagers" ADD CONSTRAINT "villagers_personnality_id_fkey" FOREIGN KEY ("personnality_id") REFERENCES "personnalities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insects" ADD CONSTRAINT "insects_indect_location_id_fkey" FOREIGN KEY ("indect_location_id") REFERENCES "insect_locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fishs" ADD CONSTRAINT "fishs_sea_place_id_fkey" FOREIGN KEY ("sea_place_id") REFERENCES "sea_places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "month_range_apparitions" ADD CONSTRAINT "month_range_apparitions_insect_id_fkey" FOREIGN KEY ("insect_id") REFERENCES "insects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "month_range_apparitions" ADD CONSTRAINT "month_range_apparitions_fish_id_fkey" FOREIGN KEY ("fish_id") REFERENCES "fishs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "month_range_apparitions" ADD CONSTRAINT "month_range_apparitions_sea_creature_id_fkey" FOREIGN KEY ("sea_creature_id") REFERENCES "sea_creatures"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variations" ADD CONSTRAINT "variations_furniture_id_fkey" FOREIGN KEY ("furniture_id") REFERENCES "furnitures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
