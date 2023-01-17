import { Transform } from 'class-transformer';
import { ArrayMaxSize, IsArray, IsEnum, IsIn, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';
import { ValidityMessage as VM } from '@readme/core';
import { DEFAULT_PUBLICATION_QUERY_LIMIT, DEFAULT_PUBLICATION_SORT_DIRECTION, PublicationSort, PublicationValidity as PV } from '../publication.constant';


export class PublicationQuery {
  @Transform(({ value }) => +value || DEFAULT_PUBLICATION_QUERY_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit?= DEFAULT_PUBLICATION_QUERY_LIMIT;

  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  public page?: number;

  @IsEnum(PublicationSort, { message: VM.IsEnumMessage })
  @IsOptional()
  public sortType?: PublicationSort = PublicationSort.Date;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' = DEFAULT_PUBLICATION_SORT_DIRECTION;

  @Transform(({ value }) => value.split(','))
  @ArrayMaxSize(PV.TagsMaxQuantity, { message: VM.IsArrayMaxSizeMessage })
  @IsArray()
  @IsOptional()
  public tags?: string[];

  @IsMongoId()
  @IsOptional()
  public userId?: string;

  @IsString()
  @IsOptional()
  public searchInTitle?: string = '';
}
