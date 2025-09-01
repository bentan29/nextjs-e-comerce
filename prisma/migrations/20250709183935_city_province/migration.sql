/*
  Warnings:

  - You are about to drop the column `city` on the `UserAddress` table. All the data in the column will be lost.
  - Added the required column `city_id` to the `UserAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province_id` to the `UserAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserAddress" DROP COLUMN "city",
ADD COLUMN     "city_id" TEXT NOT NULL,
ADD COLUMN     "province_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "Province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
