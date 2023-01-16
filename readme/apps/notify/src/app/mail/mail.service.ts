import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Subscriber, Publication } from '@readme/shared-types';
import { EMAIL_ADD_PUBLICATION_SUBJECT, EMAIL_ADD_SUBSCRIBER_SUBJECT } from './mail.constant';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) { }

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      to: subscriber.email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        user: `${subscriber.firstName} ${subscriber.lastName}`,
        email: `${subscriber.email}`,
      }
    })
  }

  public async sendNotifyNewPublication(subscriber: Subscriber, publicationList: Publication[]) {
    await this.mailerService.sendMail({
      to: subscriber.email,
      subject: EMAIL_ADD_PUBLICATION_SUBJECT,
      template: './add-publication',
      context: {
        user: `${subscriber.firstName} ${subscriber.lastName}`,
        publications: `${publicationList.map((item)=>`${item.id}`)}`,
      }
    })
  }
}
