import { CRUDRepositoryInterface } from '@readme/core';
import { Comment } from '@readme/shared-types';
import { CommentEntity } from './comment.entity';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CommentQuery } from './query/comment.query';

@Injectable()
export class CommentRepository implements CRUDRepositoryInterface<CommentEntity, number, Comment> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: CommentEntity, id: number): Promise<Comment> {
    const { content, publicationId, userId } = item.toObject();
    const [comment] = await this.prisma.$transaction([
      this.prisma.comment.create({
        data: {
          content,
          userId,
          publication: {
            connect: { id: publicationId }
          }
        }
      }),
      this.prisma.publication.update({
        where: { id },
        data: {
          commentsCount: {
            increment: 1
          },
        }
      })
    ]);

    return comment
  }

  public async destroy(commentId: number, [publicationId]): Promise<void> {
    await
      this.prisma.$transaction([
        this.prisma.comment.delete({
          where: {
            id: commentId,
          }
        }),
        this.prisma.publication.update({
          where: {
            id: publicationId
          },
          data: {
            commentsCount: {
              decrement: 1
            },
          }
        })
      ]);
  }

  public findById(id: number): Promise<Comment | null> {
    return this.prisma.comment.findFirst({
      where: {
        id
      }
    });
  }

  public find(id: number, { limit, page, sortDirection }: CommentQuery): Promise<Comment[]> {
    return this.prisma.comment.findMany({
      where: {
        publicationId: id
      },
      take: limit,
      orderBy: [
        {
          createdAt: sortDirection
        }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public update(id: number, item: Partial<Comment>): Promise<Comment> {
    return this.prisma.comment.update({
      where: {
        id
      },
      data: { ...item }
    });
  }
}
