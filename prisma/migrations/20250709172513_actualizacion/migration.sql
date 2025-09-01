/*
  Warnings:

  - You are about to drop the `State` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_id_state_fkey";

-- DropTable
DROP TABLE "State";

-- CreateTable
CREATE TABLE "Province" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Province_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Province_name_key" ON "Province"("name");

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_id_state_fkey" FOREIGN KEY ("id_state") REFERENCES "Province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
