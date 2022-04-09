import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AwsService } from './aws.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [AwsService],
})
export class AwsModule {}
