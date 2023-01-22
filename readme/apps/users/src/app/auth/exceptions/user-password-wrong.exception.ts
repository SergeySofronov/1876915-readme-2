import { BadRequestException } from '@nestjs/common';

export class UserPasswordWrongException extends BadRequestException {
  constructor() {
    super('User password is wrong');
  }
}
