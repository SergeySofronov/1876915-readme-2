import { NotFoundException } from '@nestjs/common';

export class PublicationAlreadyLikedException extends NotFoundException {
  constructor(id: number, userId: string) {
    super(`A user ${userId} has already liked the publication ${id}`);
  }
}
