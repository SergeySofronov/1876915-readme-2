import { UnauthorizedException } from '@nestjs/common';

export class UserNotRegisteredException extends UnauthorizedException {
  constructor(email: string) {
    super(`User with email ${email} is not registered`);
  }
}
