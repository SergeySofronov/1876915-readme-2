import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CRUDRepositoryInterface } from '@readme/core';
import { Publication } from '@readme/shared-types';
import { PublicationEntity } from './publication.entity';
import { PublicationQuery } from './query/publication.query';
import { PublicationSortField } from './publication.constant';

@Injectable()
export class PublicationRepository implements CRUDRepositoryInterface<PublicationEntity, number, Publication> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: PublicationEntity): Promise<Publication> {
    const entityData = item.toObject();
    const newPublication = await this.prisma.publication.create({
      data: {
        ...entityData,
        tags: {
          connectOrCreate: [
            ...entityData.tags.map(({ name }) => ({
              create: { name },
              where: { name }
            }))
          ],
        },
        comments: {
          connect: []
        }
      }
    });

    return this.prisma.publication.update({
      where: { id: newPublication.id },
      data: {
        originalId: newPublication.id
      },
      include: {
        tags: true,
      }
    })
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.publication.delete({
      where: {
        id,
      }
    });
  }

  public async findById(id: number): Promise<Publication | null> {
    return this.prisma.publication.findFirst({
      where: {
        id
      },
      include: {
        tags: true,
      }
    });
  }

  public async find({ limit, page, sortDirection, sortType, tags, userId }: PublicationQuery, isPublished = true): Promise<Publication[]> {
    const sortField = { [PublicationSortField[sortType]]: sortDirection };

    return this.prisma.publication.findMany({
      take: limit,
      where: {
        isPublished,
        userId,
        tags: {
          some: {
            name: {
              in: tags
            }
          }
        }
      },
      include: {
        tags: true,
      },
      orderBy: [
        {
          ...sortField
        }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public async update(id: number, item: Partial<Publication>): Promise<Publication> {
    let excludingTags = [];
    let includingTags = [];

    if (item.tags) {
      excludingTags = await this.prisma.tag.findMany({
        where: {
          NOT: [
            ...(item.tags || []),
          ],
          publication: {
            some: {
              id
            }
          }
        }
      });

      includingTags = item.tags.map(({ name }) => ({
        create: { name },
        where: { name }
      }))
    }

    return this.prisma.publication.update({
      where: { id },
      data: {
        ...item,

        tags:
        {
          disconnect: [
            ...excludingTags
          ],
          connectOrCreate: [
            ...includingTags
          ],
        },
      },
      include: {
        tags: true,
      }
    })
  }
}
