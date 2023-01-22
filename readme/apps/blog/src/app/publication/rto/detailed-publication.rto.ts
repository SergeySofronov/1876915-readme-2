import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PublicationRto } from './publication.rto';

export class DetailedPublicationRto extends PublicationRto {
  @ApiProperty({
    description: 'Unique identifier of the original publication',
    example: '1',
  })
  @Expose()
  public originalId: string;

  @ApiProperty({
    description: 'The field indicates the publication status: published (true by default) or draft (false)',
    example: 'true',
    required: true,
  })
  public isPublished: boolean;

  @ApiProperty({
    description: 'Unique identifier of user. Owner of the original publication',
    example: '62af63e1dd748f35bcf66943',
  })
  @Expose()
  originalUserId: string;

  @ApiProperty({
    description: 'A sign that the publication is a repost',
    example: 'true/false',
  })
  @Expose()
  isRepublication: string;
}
