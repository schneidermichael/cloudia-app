/*
  Warnings:

  - You are about to drop the column `operating_system` on the `AwsElasticComputingCloud` table. All the data in the column will be lost.
  - Added the required column `machine_image` to the `AwsElasticComputingCloud` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AwsElasticComputingCloud" DROP COLUMN "operating_system",
ADD COLUMN     "machine_image" VARCHAR(200) NOT NULL;
