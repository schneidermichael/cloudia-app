/*
  Warnings:

  - You are about to drop the column `storage` on the `GcpComputeEngine` table. All the data in the column will be lost.
  - Added the required column `storage` to the `AzureVirtualMachine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AzureVirtualMachine" ADD COLUMN     "storage" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "GcpComputeEngine" DROP COLUMN "storage";
