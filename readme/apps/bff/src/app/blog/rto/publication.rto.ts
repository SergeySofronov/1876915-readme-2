import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PublicationContent, PublicationType, Tag } from '@readme/shared-types';

export class PublicationRto {
  @ApiProperty({
    description: 'Unique identifier of the original or republished publication',
    example: '1',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Type of publication',
    example: 'video',
    required: true,
  })
  public type: PublicationType;

  @ApiProperty({
    description: 'Date the comment was created',
    example: `${new Date()}`,
  })
  @Expose()
  public createdAt: Date;

  @ApiProperty({
    description: 'Date the comment was updated',
    example: `${new Date()}`,
  })
  @Expose()
  public updatedAt: Date;

  @ApiProperty({
    description: 'The number of likes of the publication',
    example: '1',
  })
  @Expose()
  public likesCount: number;

  @ApiProperty({
    description: 'The number of comments of the publication',
    example: '1',
  })
  @Expose()
  public commentsCount: number;

  @ApiProperty({
    description: 'Tags for publications',
    example: '[books, cooking]',
    required: true,
  })
  @Expose()
  public tags: Tag[];

  @ApiProperty({
    description: 'The content of the publication. Depends on the type of publication',
    example: '{}',
  })
  @Expose()
  public content: PublicationContent;

  @ApiProperty({
    description: 'Unique identifier of user. Owner of the current publication',
    example: '62af63e1dd748f35bcf66943',
  })
  @Expose()
  userId: string;
}
