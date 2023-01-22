import { NotFoundException } from '@nestjs/common';

export class UserNotFoundEmailException extends NotFoundException {
  constructor(email: string) {
    super(`User with the email — ${email} not found`);
  }
}
