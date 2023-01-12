import { Module } from '@nestjs/common';
import { EmailSubscriberController } from './email-subscriber.controller';
import { EmailSubscriberService } from './email-subscriber.service';

@Module({
  controllers: [EmailSubscriberController],
  providers: [EmailSubscriberService],
})
export class EmailSubscriberModule {}
