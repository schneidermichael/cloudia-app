/*
  Warnings:

  - You are about to drop the column `cost` on the `AwsSimple` table. All the data in the column will be lost.
  - You are about to drop the column `instanceType` on the `AwsSimple` table. All the data in the column will be lost.
  - You are about to drop the column `memory` on the `AwsSimple` table. All the data in the column will be lost.
  - You are about to drop the column `monthlyPrice` on the `AwsSimple` table. All the data in the column will be lost.
  - You are about to drop the column `network` on the `AwsSimple` table. All the data in the column will be lost.
  - You are about to drop the column `spotPrice` on the `AwsSimple` table. All the data in the column will be lost.
  - You are about to drop the column `storage` on the `AwsSimple` table. All the data in the column will be lost.
  - You are about to drop the column `vcpus` on the `AwsSimple` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[InstanceType]` on the table `AwsSimple` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Cost` to the `AwsSimple` table without a default value. This is not possible if the table is not empty.
  - Added the required column `InstanceType` to the `AwsSimple` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Memory` to the `AwsSimple` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MonthlyPrice` to the `AwsSimple` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Network` to the `AwsSimple` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SpotPrice` to the `AwsSimple` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Storage` to the `AwsSimple` table without a default value. This is not possible if the table is not empty.
  - Added the required column `VCPUS` to the `AwsSimple` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "AwsSimple_instanceType_key";

-- AlterTable
ALTER TABLE "AwsSimple" DROP COLUMN "cost",
DROP COLUMN "instanceType",
DROP COLUMN "memory",
DROP COLUMN "monthlyPrice",
DROP COLUMN "network",
DROP COLUMN "spotPrice",
DROP COLUMN "storage",
DROP COLUMN "vcpus",
ADD COLUMN     "Cost" TEXT NOT NULL,
ADD COLUMN     "InstanceType" TEXT NOT NULL,
ADD COLUMN     "Memory" TEXT NOT NULL,
ADD COLUMN     "MonthlyPrice" TEXT NOT NULL,
ADD COLUMN     "Network" TEXT NOT NULL,
ADD COLUMN     "SpotPrice" TEXT NOT NULL,
ADD COLUMN     "Storage" TEXT NOT NULL,
ADD COLUMN     "VCPUS" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AwsSimple_InstanceType_key" ON "AwsSimple"("InstanceType");
