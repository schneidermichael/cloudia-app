/*
  Warnings:

  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "eMail" TEXT NOT NULL,
    "pwd" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "confirmToken" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" VARCHAR(200) NOT NULL,
    "providerA" VARCHAR(200) NOT NULL,
    "providerB" VARCHAR(200) NOT NULL,
    "priceA" DOUBLE PRECISION NOT NULL,
    "priceB" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_eMail_key" ON "User"("eMail");

-- CreateIndex
CREATE UNIQUE INDEX "User_confirmToken_key" ON "User"("confirmToken");

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
