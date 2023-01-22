import { Injectable } from '@nestjs/common';
import { Comment } from '@readme/shared-types';
import { PublicationNotFoundException } from '../publication/exceptions';
import { CommentNotFoundException, CommentNotOwnerException } from './exceptions';
import { PublicationRepository } from '../publication/publication.repository';
import { CommentEntity } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentQuery } from './query/comment.query';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly publicationRepository: PublicationRepository,
  ) { }

  public async createComment(dto: CreateCommentDto): Promise<Comment> {
    const publicationId = dto.publicationId;
    const existPublication = await this.publicationRepository.findById(publicationId);
    if (!existPublication) {
      throw new PublicationNotFoundException(publicationId);
    }
    const commentEntity = new CommentEntity(dto);
    return this.commentRepository.create(commentEntity, publicationId);
  }

  public async deleteComment(id: number, userId: string): Promise<void> {
    const existComment = await this.commentRepository.findById(id);
    const existPublication = await this.publicationRepository.findByCommentId(id);
    if (!existComment) {
      throw new CommentNotFoundException(id);
    }
    if (existComment.userId !== userId) {
      throw new CommentNotOwnerException(id, userId);
    }

    this.commentRepository.destroy(id, [existPublication.id]);
  }

  public async getComment(id: number): Promise<Comment> {
    return this.commentRepository.findById(id);
  }

  public async getComments(id: number, query: CommentQuery): Promise<Comment[]> {
    return this.commentRepository.find(id, query);
  }

  public async updateComment(id: number, dto: UpdateCommentDto): Promise<Comment> {
    const existComment = await this.commentRepository.findById(id);
    if (!existComment) {
      throw new CommentNotFoundException(id);
    }

    return this.commentRepository.update(id, { ...dto, updatedAt: new Date() });
  }
}
