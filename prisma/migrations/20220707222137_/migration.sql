/*
  Warnings:

  - You are about to drop the column `instance_series` on the `AzureVirtualMachine` table. All the data in the column will be lost.
  - Added the required column `instance_serie` to the `AzureVirtualMachine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AzureVirtualMachine" DROP COLUMN "instance_series",
ADD COLUMN     "instance_serie" VARCHAR(200) NOT NULL;
