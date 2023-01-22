import { NotFoundException } from '@nestjs/common';

export class PublicationAlreadyCopiedException extends NotFoundException {
  constructor(id: number) {
    super(`Publication with id ${id} already copied`);
  }
}
