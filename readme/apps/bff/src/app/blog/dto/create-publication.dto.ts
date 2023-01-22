import { ApiProperty } from '@nestjs/swagger';
import { PublicationContent, PublicationType, PublicationTypeObject, Tag } from '@readme/shared-types';

export class CreatePublicationDto {
  @ApiProperty({
    description: 'Type of publication',
    example: 'video',
    required: true,
    type: () => String,
    enum: PublicationTypeObject,
  })
  public type: PublicationType;

  @ApiProperty({
    description: 'The field indicates the publication status: published (true by default) or draft (false)',
    example: 'true',
    required: true,
  })
  public isPublished?: boolean;

  @ApiProperty({
    description: 'Tags for publications',
    example: '[books, cooking]',
    required: true,
  })
  public tags?: Tag[];

  @ApiProperty({
    description: 'The content of the publication. Depends on the type of publication',
    example: '{}',
    required: true,
  })
  public content: PublicationContent;

  @ApiProperty({
    description: 'User unique identifier',
    example: '62af63e1dd748f35bcf66943',
    required: true,
  })
  public userId: string;

  public photo: string;
}
