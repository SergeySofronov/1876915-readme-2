import { NotFoundException } from '@nestjs/common';

export class CommentNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`Comment with the id — ${id} not found`);
  }
}
