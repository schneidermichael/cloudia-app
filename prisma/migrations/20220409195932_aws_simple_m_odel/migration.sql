-- CreateTable
CREATE TABLE "AwsSimple" (
    "instanceType" TEXT NOT NULL,
    "memory" TEXT NOT NULL,
    "vcpus" TEXT NOT NULL,
    "storage" TEXT NOT NULL,
    "network" TEXT NOT NULL,
    "cost" TEXT NOT NULL,
    "monthlyPrice" TEXT NOT NULL,
    "spotPrice" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AwsSimple_instanceType_key" ON "AwsSimple"("instanceType");
