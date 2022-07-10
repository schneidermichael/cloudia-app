/*
  Warnings:

  - You are about to drop the column `createdAt` on the `History` table. All the data in the column will be lost.
  - You are about to drop the column `priceA` on the `History` table. All the data in the column will be lost.
  - You are about to drop the column `priceB` on the `History` table. All the data in the column will be lost.
  - You are about to drop the column `providerA` on the `History` table. All the data in the column will be lost.
  - You are about to drop the column `providerB` on the `History` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `History` table. All the data in the column will be lost.
  - You are about to drop the column `confirmToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `eMail` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `pwd` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[confirm_token]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `price_a` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_b` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider_a` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider_b` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_userId_fkey";

-- DropIndex
DROP INDEX "User_confirmToken_key";

-- DropIndex
DROP INDEX "User_eMail_key";

-- AlterTable
ALTER TABLE "History" DROP COLUMN "createdAt",
DROP COLUMN "priceA",
DROP COLUMN "priceB",
DROP COLUMN "providerA",
DROP COLUMN "providerB",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "price_a" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "price_b" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "provider_a" VARCHAR(200) NOT NULL,
ADD COLUMN     "provider_b" VARCHAR(200) NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "confirmToken",
DROP COLUMN "createdAt",
DROP COLUMN "eMail",
DROP COLUMN "firstName",
DROP COLUMN "isActive",
DROP COLUMN "lastName",
DROP COLUMN "pwd",
DROP COLUMN "title",
DROP COLUMN "updatedAt",
ADD COLUMN     "confirm_token" TEXT,
ADD COLUMN     "country_name" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Country" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_confirm_token_key" ON "User"("confirm_token");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_country_name_fkey" FOREIGN KEY ("country_name") REFERENCES "Country"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
