-- CreateTable
CREATE TABLE "AwsRelationalDatabase" (
    "id" SERIAL NOT NULL,
    "region" TEXT NOT NULL,

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

    CONSTRAINT "GcpCloudSql_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AwsRelationalDatabase" ADD CONSTRAINT "AwsRelationalDatabase_region_fkey" FOREIGN KEY ("region") REFERENCES "AwsRegion"("region") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AzurePostgreSql" ADD CONSTRAINT "AzurePostgreSql_region_fkey" FOREIGN KEY ("region") REFERENCES "AzureRegion"("region") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GcpCloudSql" ADD CONSTRAINT "GcpCloudSql_region_fkey" FOREIGN KEY ("region") REFERENCES "GcpRegion"("region") ON DELETE RESTRICT ON UPDATE CASCADE;
