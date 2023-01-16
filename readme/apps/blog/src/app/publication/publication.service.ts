import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { createEvent } from '@readme/core';
import { CommandEvent, NotifyPublications, Publication, RabbitClient } from '@readme/shared-types';
import { PublicationEntity } from './publication.entity';
import { PublicationRepository } from './publication.repository';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationQuery } from './query/publication.query';
import { DEFAULT_PUBLICATION_QUERY_LIMIT } from './publication.constant';
import { NotifyPublicationsDto } from './dto/notify-publications.dto';

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
      throw new Error(`Publication with id ${id} doesn't exist`);
    }
    this.publicationRepository.destroy(id);
  }

  async getPublication(id: number): Promise<Publication> {
    //todo: здесь возвращать NOT_FOUND
    return this.publicationRepository.findById(id);
  }

  async getPublications(query: PublicationQuery, options?: Record<string, unknown>): Promise<Publication[]> {
    //todo: здесь возвращать NOT_FOUND
    return this.publicationRepository.find(query, options);
  }

  async updatePublication(id: number, dto: UpdatePublicationDto): Promise<Publication> {
    const existPublication = await this.publicationRepository.findById(id);
    if (!existPublication) {
      throw new Error(`Publication with id ${id} doesn't exist`);
    }
    return this.publicationRepository.update(id, { ...dto, updatedAt: new Date() });
  }

  public async sendPublicationForNotify({ userId, lastPublicationDate }: NotifyPublicationsDto) {
    const publications = await this.getPublications({ limit: DEFAULT_PUBLICATION_QUERY_LIMIT, userId }, { createdAt: { gt: lastPublicationDate } })

    if (publications?.length) {
      this.rabbitPubClient.emit<unknown, NotifyPublications>(
        createEvent(CommandEvent.sendPublications),
        {
          publications
        }
      );
    }

    return;
  }

}
