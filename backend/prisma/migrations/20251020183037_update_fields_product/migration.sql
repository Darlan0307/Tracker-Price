-- AlterTable
ALTER TABLE "products" ALTER COLUMN "old_price" DROP NOT NULL,
ALTER COLUMN "discount_percentage" DROP NOT NULL,
ALTER COLUMN "discount_percentage" DROP DEFAULT,
ALTER COLUMN "discount_percentage" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "discount_amount" DROP NOT NULL,
ALTER COLUMN "discount_amount" DROP DEFAULT;
