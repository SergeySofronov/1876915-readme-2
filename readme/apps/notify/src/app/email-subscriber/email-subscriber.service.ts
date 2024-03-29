import { Injectable } from '@nestjs/common';
import { Publication } from '@readme/shared-types';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { MailService } from '../mail/mail.service';
import { SubscriberExistsException } from './exceptions';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository,
    private readonly mailService: MailService,
  ) { }

  public async addSubscriber(subscriber: CreateSubscriberDto) {
    const { email } = subscriber;
    const existsSubscriber = await this.emailSubscriberRepository.findByEmail(email);

    if (existsSubscriber) {
      throw new SubscriberExistsException(email);
    }

    this.mailService.sendNotifyNewSubscriber(subscriber);

    return this.emailSubscriberRepository.create(new EmailSubscriberEntity(subscriber));
  }

  public async sendNotifyNewPublication(publications: Publication[]) {
    const existsSubscribers = await this.emailSubscriberRepository.findAll();

    if (existsSubscribers?.length) {
      for (const subscriber of existsSubscribers) {
        this.mailService.sendNotifyNewPublication(subscriber, publications);
      }
    }
  }
}
