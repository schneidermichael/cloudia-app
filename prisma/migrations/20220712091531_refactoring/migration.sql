-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "confirm_token" TEXT,
    "country_name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "AwsElasticComputingCloud" (
    "id" SERIAL NOT NULL,
    "region" TEXT NOT NULL,
    "machine_image" VARCHAR(200) NOT NULL,
    "instance_type" VARCHAR(200) NOT NULL,
    "core" INTEGER NOT NULL,
    "ram" INTEGER NOT NULL,
    "price_per_hour" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "AwsElasticComputingCloud_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AwsRegion" (
    "region" TEXT NOT NULL,

    CONSTRAINT "AwsRegion_pkey" PRIMARY KEY ("region")
);

-- CreateTable
CREATE TABLE "AzureVirtualMachine" (
    "id" SERIAL NOT NULL,
    "region" TEXT NOT NULL,
    "operating_system" VARCHAR(200) NOT NULL,
    "instance_serie" VARCHAR(200) NOT NULL,
    "core" INTEGER NOT NULL,
    "ram" INTEGER NOT NULL,
    "storage" INTEGER NOT NULL,
    "price_per_hour" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "AzureVirtualMachine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AzureRegion" (
    "region" TEXT NOT NULL,

    CONSTRAINT "AzureRegion_pkey" PRIMARY KEY ("region")
);

-- CreateTable
CREATE TABLE "GcpComputeEngine" (
    "id" SERIAL NOT NULL,
    "region" TEXT NOT NULL,
    "image" VARCHAR(200) NOT NULL,
    "machine_type" VARCHAR(200) NOT NULL,
    "core" INTEGER NOT NULL,
    "ram" INTEGER NOT NULL,
    "price_per_hour" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "GcpComputeEngine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GcpRegion" (
    "region" TEXT NOT NULL,

    CONSTRAINT "GcpRegion_pkey" PRIMARY KEY ("region")
);

-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" VARCHAR(200) NOT NULL,
    "provider_a" VARCHAR(200) NOT NULL,
    "provider_b" VARCHAR(200) NOT NULL,
    "price_a" DOUBLE PRECISION NOT NULL,
    "price_b" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AwsRelationalDatabase" (
    "id" SERIAL NOT NULL,
    "region" TEXT NOT NULL,
    "instance_type" VARCHAR(200) NOT NULL,
    "core" INTEGER NOT NULL,
    "ram" INTEGER NOT NULL,
    "price_per_hour" DOUBLE PRECISION NOT NULL,
    "price_per_gib" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "AwsRelationalDatabase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AzurePostgreSql" (
    "id" SERIAL NOT NULL,
    "region" TEXT NOT NULL,
    "instance_serie" VARCHAR(200) NOT NULL,
    "core" INTEGER NOT NULL,
    "ram" INTEGER NOT NULL,
    "price_per_hour" DOUBLE PRECISION NOT NULL,
    "price_per_gib" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "AzurePostgreSql_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GcpCloudSql" (
    "id" SERIAL NOT NULL,
    "region" TEXT NOT NULL,
    "price_per_cpu_hour" DOUBLE PRECISION NOT NULL,
    "price_per_ram_hour" DOUBLE PRECISION NOT NULL,
    "price_per_gib" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "GcpCloudSql_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_confirm_token_key" ON "User"("confirm_token");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_country_name_fkey" FOREIGN KEY ("country_name") REFERENCES "Country"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AwsElasticComputingCloud" ADD CONSTRAINT "AwsElasticComputingCloud_region_fkey" FOREIGN KEY ("region") REFERENCES "AwsRegion"("region") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AzureVirtualMachine" ADD CONSTRAINT "AzureVirtualMachine_region_fkey" FOREIGN KEY ("region") REFERENCES "AzureRegion"("region") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GcpComputeEngine" ADD CONSTRAINT "GcpComputeEngine_region_fkey" FOREIGN KEY ("region") REFERENCES "GcpRegion"("region") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AwsRelationalDatabase" ADD CONSTRAINT "AwsRelationalDatabase_region_fkey" FOREIGN KEY ("region") REFERENCES "AwsRegion"("region") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AzurePostgreSql" ADD CONSTRAINT "AzurePostgreSql_region_fkey" FOREIGN KEY ("region") REFERENCES "AzureRegion"("region") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GcpCloudSql" ADD CONSTRAINT "GcpCloudSql_region_fkey" FOREIGN KEY ("region") REFERENCES "GcpRegion"("region") ON DELETE RESTRICT ON UPDATE CASCADE;
