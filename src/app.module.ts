import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AwsModule } from './aws/aws.module';
import { AzureModule } from './azure/azure.module';
import { GcpModule } from './gcp/gcp.module';
import { HistoryModule } from './history/history.module';
import { CountryModule } from './country/country.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    PrismaModule,
    AwsModule,
    AzureModule,
    HttpModule,
    GcpModule,
    HistoryModule,
    CountryModule,
  ],
})
export class AppModule {}
