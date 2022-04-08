/*
  Warnings:

  - A unique constraint covering the columns `[eMail]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Users_eMail_key" ON "Users"("eMail");
