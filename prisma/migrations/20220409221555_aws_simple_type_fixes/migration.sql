/*
  Warnings:

  - Changed the type of `Cost` on the `AwsSimple` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `MonthlyPrice` on the `AwsSimple` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `VCPUS` on the `AwsSimple` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "AwsSimple" DROP COLUMN "Cost",
ADD COLUMN     "Cost" DOUBLE PRECISION NOT NULL,
DROP COLUMN "MonthlyPrice",
ADD COLUMN     "MonthlyPrice" DOUBLE PRECISION NOT NULL,
DROP COLUMN "VCPUS",
ADD COLUMN     "VCPUS" INTEGER NOT NULL;
