import { BadRequestException } from '@nestjs/common';

export class CommentNotOwnerException extends BadRequestException {
  constructor(id: number, userId: string) {
    super(`Comment with id ${id} doesn't belong to user ${userId}`);
  }
}
