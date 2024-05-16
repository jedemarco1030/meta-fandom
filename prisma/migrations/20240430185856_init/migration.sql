/*
  Warnings:

  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `platforms` to the `Favorite` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_gameId_fkey";

-- AlterTable
ALTER TABLE "Favorite" ADD COLUMN     "background_image" TEXT,
ADD COLUMN     "metacritic" INTEGER,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "platforms" TEXT NOT NULL,
ADD COLUMN     "released" TEXT,
ALTER COLUMN "gameId" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "Game";
