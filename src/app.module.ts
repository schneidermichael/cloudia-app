import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AwsModule } from './provider/aws/aws.module';
import { AzureModule } from './provider/azure/azure.module';
import { GoogleModule } from './provider/google/google.module';
import { HttpModule } from '@nestjs/axios';

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
    GoogleModule,
    HttpModule
  ],
})
export class AppModule {}
