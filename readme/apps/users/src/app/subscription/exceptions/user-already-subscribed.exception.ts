import { BadRequestException } from '@nestjs/common/exceptions';

export class UserAlreadySubscribedException extends BadRequestException {
  constructor(followerId: string, bloggerId: string) {
    super(`User with id ${followerId} already subscribed on user with id ${bloggerId}`);
  }
}
