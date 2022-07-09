-- CreateTable
CREATE TABLE "AwsElasticComputingCloud" (
    "id" SERIAL NOT NULL,
    "region" VARCHAR(200) NOT NULL,
    "operating_system" VARCHAR(200) NOT NULL,
    "instance_type" VARCHAR(200) NOT NULL,
    "core" INTEGER NOT NULL,
    "ram" INTEGER NOT NULL,
    "storage" INTEGER NOT NULL,
    "price_per_hour" DOUBLE PRECISION NOT NULL,
    "price_per_gb" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "AwsElasticComputingCloud_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AwsRegion" (
    "id" SERIAL NOT NULL,
    "zone" TEXT NOT NULL,

    CONSTRAINT "AwsRegion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AzureVirtualMachine" (
    "id" SERIAL NOT NULL,
    "operating_system" VARCHAR(200) NOT NULL,
    "instance_series" VARCHAR(200) NOT NULL,
    "core" INTEGER NOT NULL,
    "ram" INTEGER NOT NULL,
    "storage" INTEGER NOT NULL,
    "price_per_hour" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "AzureVirtualMachine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AzureRegion" (
    "id" SERIAL NOT NULL,
    "zone" TEXT NOT NULL,

    CONSTRAINT "AzureRegion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GcpComputeEngine" (
    "id" SERIAL NOT NULL,
    "region" VARCHAR(200) NOT NULL,
    "image" VARCHAR(200) NOT NULL,
    "machine_type" VARCHAR(200) NOT NULL,
    "core" INTEGER NOT NULL,
    "ram" INTEGER NOT NULL,
    "storage" INTEGER NOT NULL,
    "price_per_hour" DOUBLE PRECISION NOT NULL,
    "price_per_gb" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "GcpComputeEngine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GcpRegion" (
    "id" SERIAL NOT NULL,
    "zone" TEXT NOT NULL,

    CONSTRAINT "GcpRegion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AwsRegion_zone_key" ON "AwsRegion"("zone");

-- CreateIndex
CREATE UNIQUE INDEX "AzureRegion_zone_key" ON "AzureRegion"("zone");

-- CreateIndex
CREATE UNIQUE INDEX "GcpRegion_zone_key" ON "GcpRegion"("zone");

-- AddForeignKey
ALTER TABLE "AzureRegion" ADD CONSTRAINT "AzureRegion_id_fkey" FOREIGN KEY ("id") REFERENCES "AzureVirtualMachine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
