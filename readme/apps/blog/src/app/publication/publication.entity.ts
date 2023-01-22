import { Publication, PublicationContent, PublicationType, Tag } from '@readme/shared-types';
import { Entity } from '@readme/core';

export class PublicationEntity implements Entity<PublicationEntity, Publication>, Publication {
  public id?: number;
  public originalId: number;
  public type: PublicationType;
  public isPublished: boolean;
  public createdAt?: Date;
  public updatedAt?: Date;
  public likesCount: number;
  public commentsCount: number;
  public tags: Tag[];
  public content: PublicationContent;
  public isRepublication: boolean;
  public originalUserId: string;
  public userId: string;

  constructor(publication: Publication) {
    this.fillEntity(publication);
  }

  public fillEntity(entity: Publication): void {
    this.id = entity.id;
    this.originalId = entity.originalId || entity.id;
    this.type = entity.type;
    this.isPublished = entity.isPublished || true;
    this.createdAt = entity.createdAt || new Date();
    this.updatedAt = entity.updatedAt || new Date();
    this.likesCount = entity.likesCount || 0;
    this.commentsCount = entity.commentsCount || 0;
    this.tags = entity.tags || [];
    this.content = entity.content;
    this.isRepublication = entity.isRepublication || false;
    this.originalUserId = entity.originalUserId || entity.userId;
    this.userId = entity.userId;
  }

  public toObject(): PublicationEntity {
    return { ...this };
  }

}
