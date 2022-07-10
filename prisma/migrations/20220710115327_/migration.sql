/*
  Warnings:

  - You are about to drop the column `core` on the `GcpCloudSql` table. All the data in the column will be lost.
  - You are about to drop the column `machine_type` on the `GcpCloudSql` table. All the data in the column will be lost.
  - You are about to drop the column `price_per_hour` on the `GcpCloudSql` table. All the data in the column will be lost.
  - You are about to drop the column `ram` on the `GcpCloudSql` table. All the data in the column will be lost.
  - Added the required column `price_per_cpu_hour` to the `GcpCloudSql` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_per_ram_hour` to the `GcpCloudSql` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GcpCloudSql" DROP COLUMN "core",
DROP COLUMN "machine_type",
DROP COLUMN "price_per_hour",
DROP COLUMN "ram",
ADD COLUMN     "price_per_cpu_hour" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "price_per_ram_hour" DOUBLE PRECISION NOT NULL;
