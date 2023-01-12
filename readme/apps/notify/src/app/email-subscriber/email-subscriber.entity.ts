import { Entity } from '@readme/core';
import { Subscriber } from '@readme/shared-types';

export class EmailSubscriberEntity implements Entity<EmailSubscriberEntity, Subscriber>, Subscriber {
  public id: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public userId: string;

  constructor(emailSubscriber: Subscriber) {
    this.fillEntity(emailSubscriber);
  }

  public fillEntity(entity: Subscriber) {
    this.email = entity.email;
    this.userId = entity.userId;
    this.lastName = entity.firstName;
    this.firstName = entity.lastName;
    this.id = entity.id ?? '';
  }

  public toObject(): EmailSubscriberEntity {
    return { ...this };
  }
}
