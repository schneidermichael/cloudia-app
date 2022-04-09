import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { GoogleService } from './google.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [GoogleService]
})
export class GoogleModule {}
