import { BadRequestException } from '@nestjs/common/exceptions';

export class UserNotSubscribedException extends BadRequestException {
  constructor(followerId: string, bloggerId: string) {
    super(`The user with id ${followerId} is not subscribed to the user with id ${bloggerId}`);
  }
}
