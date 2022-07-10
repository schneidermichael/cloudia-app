/*
  Warnings:

  - Added the required column `core` to the `AwsRelationalDatabase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instance_type` to the `AwsRelationalDatabase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_per_gib` to the `AwsRelationalDatabase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_per_hour` to the `AwsRelationalDatabase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ram` to the `AwsRelationalDatabase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `core` to the `GcpCloudSql` table without a default value. This is not possible if the table is not empty.
  - Added the required column `machine_type` to the `GcpCloudSql` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_per_gib` to the `GcpCloudSql` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_per_hour` to the `GcpCloudSql` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ram` to the `GcpCloudSql` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AwsRelationalDatabase" ADD COLUMN     "core" INTEGER NOT NULL,
ADD COLUMN     "instance_type" VARCHAR(200) NOT NULL,
ADD COLUMN     "price_per_gib" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "price_per_hour" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "ram" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "GcpCloudSql" ADD COLUMN     "core" INTEGER NOT NULL,
ADD COLUMN     "machine_type" VARCHAR(200) NOT NULL,
ADD COLUMN     "price_per_gib" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "price_per_hour" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "ram" INTEGER NOT NULL;
