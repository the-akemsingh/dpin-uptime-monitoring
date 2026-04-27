/*
  Warnings:

  - Added the required column `pendingPayout` to the `Validator` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `latency` on the `WebsiteTick` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Validator" ADD COLUMN     "pendingPayout" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "WebsiteTick" DROP COLUMN "latency",
ADD COLUMN     "latency" INTEGER NOT NULL;
