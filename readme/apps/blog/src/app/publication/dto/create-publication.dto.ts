import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsBoolean, IsOptional, IsArray, ArrayMaxSize, IsObject, IsMongoId } from 'class-validator';
import { PublicationContent, PublicationType, PublicationTypeObject, Tag } from '@readme/shared-types';
import { PublicationValidity as PV } from '../publication.constant';
import { TagMaxLength, TagMinLength, IsTagValidValue } from '../validation/publication-custom.decorators';
import { ValidityMessage as VM } from '@readme/core';

export class CreatePublicationDto {
  @ApiProperty({
    description: 'Type of publication',
    example: 'video',
    required: true,
    type: () => String,
    enum: PublicationTypeObject,
  })
  @IsEnum(PublicationTypeObject, { message: `Allowed genre types: ${Object.values(PublicationTypeObject)}` })
  public type: PublicationType;

  @ApiProperty({
    description: 'The field indicates the publication status: published (true by default) or draft (false)',
    example: 'true',
    required: true,
  })
  @IsBoolean()
  @IsOptional()
  public isPublished?: boolean;

  @ApiProperty({
    description: 'Tags for publications',
    example: '[books, cooking]',
    required: true,
  })
  @ArrayMaxSize(PV.TagsMaxQuantity, { message: VM.IsArrayMaxSizeMessage })
  @IsArray({ message: VM.IsArrayMessage })
  @Transform(({ value }) => Array.from(new Set<string>(value)).map((item) => ({ name: item.toLowerCase() })))
  @TagMinLength(PV.TagMinLength, { message: VM.MinValueMessage })
  @TagMaxLength(PV.TagMaxLength, { message: VM.MaxValueMessage })
  @IsTagValidValue(new RegExp('^[a-z\\u0400-\\u04FF]+$', 'i'), { message: VM.IsValidValueMessage })
  @IsOptional()
  public tags?: Tag[];

  @ApiProperty({
    description: 'The content of the publication. Depends on the type of publication',
    example: '{}',
    required: true,
  })
  @IsObject()
  public content: PublicationContent;

  @ApiProperty({
    description: 'User unique identifier',
    example: '62af63e1dd748f35bcf66943',
    required: true,
  })
  @IsMongoId()
  @IsOptional()
  public userId: string;

  public photo: string;
}
