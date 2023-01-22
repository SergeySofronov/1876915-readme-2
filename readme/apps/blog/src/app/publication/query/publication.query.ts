import { Transform } from 'class-transformer';
import { ArrayMaxSize, IsArray, IsBoolean, IsEnum, IsIn, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';
import { ValidityMessage as VM } from '@readme/core';
import { PublicationQueryDefault as PQ, PublicationValidity as PV, PublicationSort } from '../publication.constant';


export class PublicationQuery {
  @Transform(({ value }) => +value || PQ.DEFAULT_PUBLICATION_QUERY_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit?: number = PQ.DEFAULT_PUBLICATION_QUERY_LIMIT;

  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  public page?: number;

  @IsEnum(PublicationSort, { message: VM.IsEnumMessage })
  @IsOptional()
  public sortType?: PublicationSort = PublicationSort.Date;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' = PQ.DEFAULT_PUBLICATION_SORT_DIRECTION;

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

  @Transform(({ value }) => (value === '1' || value === 'true') ? true : false)
  @IsBoolean()
  @IsOptional()
  public isLike?: boolean;
}
