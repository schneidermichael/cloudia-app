/*
  Warnings:

  - Added the required column `storage` to the `GcpComputeEngine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GcpComputeEngine" ADD COLUMN     "storage" INTEGER NOT NULL;
