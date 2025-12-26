/*
  Warnings:

  - You are about to drop the column `rustime` on the `Movie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "rustime",
ADD COLUMN     "runtime" INTEGER;
