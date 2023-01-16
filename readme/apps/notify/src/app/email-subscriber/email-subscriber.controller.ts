import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CommandEvent as CM } from '@readme/shared-types';
import { EmailSubscriberService } from './email-subscriber.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { NotifyPublicationDto } from './dto/notify-publication.dto';

// @EventPattern` из пакета `@nestjs/microservices` позволяет определить обработчик события.
// Метод `create` будет вызван при наступлении события `AddSubscriber`.

@Controller('subscriber')
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
  ) { }

  @EventPattern({ cmd: CM.AddSubscriber })
  public async create(subscriber: CreateSubscriberDto) {
    return this.subscriberService.addSubscriber(subscriber);
  }

  @EventPattern({ cmd: CM.sendPublications })
  public async notify({ publications }: NotifyPublicationDto) {
    return this.subscriberService.sendNotifyNewPublication(publications);
  }
}
