import { Injectable } from '@nestjs/common';
import { Publication } from '@readme/shared-types';
import { PublicationEntity } from './publication.entity';
import { PublicationRepository } from './publication.repository';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationQuery } from './query/publication.query';

@Injectable()
export class PublicationService {
  constructor(
    private readonly publicationRepository: PublicationRepository,
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

  async getPublications(query: PublicationQuery, isPublished?: boolean): Promise<Publication[]> {
    //todo: здесь возвращать NOT_FOUND
    return this.publicationRepository.find(query, isPublished);
  }

  async updatePublication(id: number, dto: UpdatePublicationDto): Promise<Publication> {
    const existPublication = await this.publicationRepository.findById(id);
    if (!existPublication) {
      throw new Error(`Publication with id ${id} doesn't exist`);
    }
    return this.publicationRepository.update(id, { ...dto, updatedAt: new Date() });
  }

}
