/*
  Warnings:

  - You are about to drop the column `isPremium` on the `users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PlanType" AS ENUM ('GRATUITO', 'PRO', 'PREMIUM');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "isPremium",
ADD COLUMN     "acceptEmailNotification" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "planType" "PlanType" NOT NULL DEFAULT 'GRATUITO',
ADD COLUMN     "qtdMonitoredProducts" INTEGER NOT NULL DEFAULT 0;
