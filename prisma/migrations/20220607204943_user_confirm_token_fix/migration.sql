/*
  Warnings:

  - A unique constraint covering the columns `[confirmToken]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Users_confirmToken_key" ON "Users"("confirmToken");
