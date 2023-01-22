import { NotFoundException } from '@nestjs/common';

export class PublicationNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`Publication with the id — ${id} not found`);
  }
}
