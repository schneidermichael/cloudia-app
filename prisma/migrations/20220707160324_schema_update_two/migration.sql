/*
  Warnings:

  - You are about to drop the column `price_per_gb` on the `AwsElasticComputingCloud` table. All the data in the column will be lost.
  - You are about to drop the column `storage` on the `AwsElasticComputingCloud` table. All the data in the column will be lost.
  - The primary key for the `AwsRegion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `AwsRegion` table. All the data in the column will be lost.
  - You are about to drop the column `zone` on the `AwsRegion` table. All the data in the column will be lost.
  - The primary key for the `AzureRegion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `AzureRegion` table. All the data in the column will be lost.
  - You are about to drop the column `zone` on the `AzureRegion` table. All the data in the column will be lost.
  - You are about to drop the column `storage` on the `AzureVirtualMachine` table. All the data in the column will be lost.
  - You are about to drop the column `price_per_gb` on the `GcpComputeEngine` table. All the data in the column will be lost.
  - You are about to drop the column `storage` on the `GcpComputeEngine` table. All the data in the column will be lost.
  - The primary key for the `GcpRegion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `GcpRegion` table. All the data in the column will be lost.
  - You are about to drop the column `zone` on the `GcpRegion` table. All the data in the column will be lost.
  - Added the required column `region` to the `AwsRegion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `AzureRegion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `AzureVirtualMachine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `GcpRegion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AzureRegion" DROP CONSTRAINT "AzureRegion_id_fkey";

-- DropIndex
DROP INDEX "AwsRegion_zone_key";

-- DropIndex
DROP INDEX "AzureRegion_zone_key";

-- DropIndex
DROP INDEX "GcpRegion_zone_key";

-- AlterTable
ALTER TABLE "AwsElasticComputingCloud" DROP COLUMN "price_per_gb",
DROP COLUMN "storage",
ALTER COLUMN "region" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "AwsRegion" DROP CONSTRAINT "AwsRegion_pkey",
DROP COLUMN "id",
DROP COLUMN "zone",
ADD COLUMN     "region" TEXT NOT NULL,
ADD CONSTRAINT "AwsRegion_pkey" PRIMARY KEY ("region");

-- AlterTable
ALTER TABLE "AzureRegion" DROP CONSTRAINT "AzureRegion_pkey",
DROP COLUMN "id",
DROP COLUMN "zone",
ADD COLUMN     "region" TEXT NOT NULL,
ADD CONSTRAINT "AzureRegion_pkey" PRIMARY KEY ("region");

-- AlterTable
ALTER TABLE "AzureVirtualMachine" DROP COLUMN "storage",
ADD COLUMN     "region" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "GcpComputeEngine" DROP COLUMN "price_per_gb",
DROP COLUMN "storage",
ALTER COLUMN "region" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "GcpRegion" DROP CONSTRAINT "GcpRegion_pkey",
DROP COLUMN "id",
DROP COLUMN "zone",
ADD COLUMN     "region" TEXT NOT NULL,
ADD CONSTRAINT "GcpRegion_pkey" PRIMARY KEY ("region");

-- AddForeignKey
ALTER TABLE "AwsElasticComputingCloud" ADD CONSTRAINT "AwsElasticComputingCloud_region_fkey" FOREIGN KEY ("region") REFERENCES "AwsRegion"("region") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AzureVirtualMachine" ADD CONSTRAINT "AzureVirtualMachine_region_fkey" FOREIGN KEY ("region") REFERENCES "AzureRegion"("region") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GcpComputeEngine" ADD CONSTRAINT "GcpComputeEngine_region_fkey" FOREIGN KEY ("region") REFERENCES "GcpRegion"("region") ON DELETE RESTRICT ON UPDATE CASCADE;
