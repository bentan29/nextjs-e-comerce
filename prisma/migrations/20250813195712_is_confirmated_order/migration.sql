-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "confirmedAt" TIMESTAMP(3),
ADD COLUMN     "isConfirmed" BOOLEAN NOT NULL DEFAULT false;
