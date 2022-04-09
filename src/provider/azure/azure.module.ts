import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AzureService } from './azure.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [AzureService],
})
export class AzureModule {}
