/*
  Warnings:

  - Changed the type of `platform` on the `products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PlatformType" AS ENUM ('MERCADO_LIVRE');

-- AlterTable
ALTER TABLE "products" DROP COLUMN "platform",
ADD COLUMN     "platform" "PlatformType" NOT NULL;
