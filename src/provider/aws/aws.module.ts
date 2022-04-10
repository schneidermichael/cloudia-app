import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AwsService } from './aws.service';
import { AwsTaskService } from './aws.task.service';
import { HttpModule } from '@nestjs/axios';
import { AwsController } from './aws.controller';

@Module({  
  controllers: [AwsController],
  imports: [ScheduleModule.forRoot(), HttpModule],
  providers: [AwsService, AwsTaskService],
})
export class AwsModule {}