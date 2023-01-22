import { NotFoundException } from '@nestjs/common';

export class UserNotFoundIdException extends NotFoundException {
  constructor(userId: string) {
    super(`User with the id — ${userId} not found`);
  }
}
