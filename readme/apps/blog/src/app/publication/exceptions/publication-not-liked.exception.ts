import { NotFoundException } from '@nestjs/common';

export class PublicationNotLikedException extends NotFoundException {
  constructor(id: number, userId: string) {
    super(`A user ${userId} has already delete like for the publication ${id}`);
  }
}
