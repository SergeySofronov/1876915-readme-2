import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { createEvent } from '@readme/core';
import { CommandEvent, NotifyPublications, Publication, RabbitClient } from '@readme/shared-types';
import { PublicationEntity } from './publication.entity';
import { PublicationRepository } from './publication.repository';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationQuery } from './query/publication.query';
import { NotifyPublicationsDto } from './dto/notify-publications.dto';
import { PublicationQueryDefault as PQ } from './publication.constant';
import { PublicationAlreadyLikedException, PublicationNotFoundException, PublicationsNotFoundException } from './exceptions';
import { PublicationNotLikedException } from './exceptions/publication-not-liked.exception';
import { PublicationAlreadyCopiedException } from './exceptions/publication-already-copied.exception';

@Injectable()
export class PublicationService {
  constructor(
    private readonly publicationRepository: PublicationRepository,
    @Inject(RabbitClient.PUBLICATION_RABBITMQ_CLIENT) private readonly rabbitPubClient: ClientProxy,
  ) { }

  async createPublication(dto: CreatePublicationDto): Promise<Publication> {
    const publicationEntity = new PublicationEntity(dto);
    return this.publicationRepository.create(publicationEntity);
  }

  async deletePublication(id: number): Promise<void> {
    const existPublication = await this.publicationRepository.findById(id);
    if (!existPublication) {
      throw new PublicationNotFoundException(id);
    }
    this.publicationRepository.destroy(id);
  }

  async getPublication(id: number): Promise<Publication> {
    const existPublication = await this.publicationRepository.findById(id);
    if (!existPublication) {
      throw new PublicationNotFoundException(id);
    }

    return existPublication;
  }

  async getPublications(query: PublicationQuery, options?: Record<string, unknown>): Promise<Publication[]> {
    const existPublications = await this.publicationRepository.find(query, options);
    if (!existPublications?.length) {
      throw new PublicationsNotFoundException();
    }
    return existPublications;
  }

  async updatePublication(id: number, dto: UpdatePublicationDto): Promise<Publication> {
    const existPublication = await this.publicationRepository.findById(id);
    if (!existPublication) {
      throw new PublicationNotFoundException(id);
    }
    return this.publicationRepository.update(id, { ...dto, updatedAt: new Date() });
  }

  public async sendPublicationForNotify({ userId, lastPublicationDate }: NotifyPublicationsDto) {
    const publications = await this.getPublications({ limit: PQ.DEFAULT_PUBLICATION_QUERY_LIMIT, userId }, { createdAt: { gt: lastPublicationDate } })

    if (publications?.length) {
      this.rabbitPubClient.emit<unknown, NotifyPublications>(
        createEvent(CommandEvent.SendPublications),
        {
          publications
        }
      );
    }

    return;
  }

  public async updatePublicationLikes(id: number, isLike: boolean, userId: string): Promise<Publication> {
    const existPublication = await this.publicationRepository.findById(id);
    if (!existPublication) {
      throw new PublicationNotFoundException(id);
    }

    const existLike = await this.publicationRepository.findLike(id, userId);
    if (existLike && isLike) {
      throw new PublicationAlreadyLikedException(id, userId);
    }
    if (!existLike && !isLike) {
      throw new PublicationNotLikedException(id, userId);
    }

    return this.publicationRepository.updateLikes(id, isLike, userId);
  }

  public async repostPublication(id: number, userId: string): Promise<Publication> {
    const existPublication = await this.publicationRepository.findById(id);
    if (!existPublication) {
      throw new PublicationNotFoundException(id);
    }

    if (existPublication.isRepublication) {
      throw new PublicationAlreadyCopiedException(id);
    }

    delete existPublication.createdAt;
    delete existPublication.updatedAt;
    delete existPublication.id;
    existPublication.isRepublication = true;
    existPublication.userId = userId;
    const rePosted = new PublicationEntity(existPublication);

    return this.publicationRepository.create(rePosted);
  }
}
