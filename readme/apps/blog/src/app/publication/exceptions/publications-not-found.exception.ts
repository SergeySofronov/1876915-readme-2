import { NotFoundException } from '@nestjs/common';

export class PublicationsNotFoundException extends NotFoundException {
  constructor() {
    super(`Publications not found`);
  }
}
