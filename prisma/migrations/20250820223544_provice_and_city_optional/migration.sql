-- DropForeignKey
ALTER TABLE "UserAddress" DROP CONSTRAINT "UserAddress_city_id_fkey";

-- DropForeignKey
ALTER TABLE "UserAddress" DROP CONSTRAINT "UserAddress_province_id_fkey";

-- AlterTable
ALTER TABLE "UserAddress" ALTER COLUMN "city_id" DROP NOT NULL,
ALTER COLUMN "province_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "Province"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;
