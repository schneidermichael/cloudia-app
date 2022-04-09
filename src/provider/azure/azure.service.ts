import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AzureService {
    private readonly logger = new Logger(AzureService.name);

    @Cron(CronExpression.EVERY_10_SECONDS)
    handleCron() {
      this.logger.debug('Called when the current second is 45');
      console.log('Called when the current second is 45');
    }
}
