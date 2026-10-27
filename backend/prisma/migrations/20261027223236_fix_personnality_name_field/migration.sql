/*
  Warnings:

  - You are about to drop the column `personnality_id` on the `villagers` table. All the data in the column will be lost.
  - You are about to drop the `personnalities` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `personality_id` to the `villagers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "villagers" DROP CONSTRAINT "villagers_personnality_id_fkey";

-- AlterTable
ALTER TABLE "villagers" DROP COLUMN "personnality_id",
ADD COLUMN     "personality_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "personnalities";

-- CreateTable
CREATE TABLE "personalities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "personalities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "personalities_name_key" ON "personalities"("name");

-- CreateIndex
CREATE INDEX "personalities_name_idx" ON "personalities"("name");

-- AddForeignKey
ALTER TABLE "villagers" ADD CONSTRAINT "villagers_personality_id_fkey" FOREIGN KEY ("personality_id") REFERENCES "personalities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
