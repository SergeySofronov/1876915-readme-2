import { NotAcceptableException } from '@nestjs/common';

export class SubscriberExistsException extends NotAcceptableException {
  constructor(email: string) {
    super(`The subscriber with email ${email} already exists`);
  }
}
