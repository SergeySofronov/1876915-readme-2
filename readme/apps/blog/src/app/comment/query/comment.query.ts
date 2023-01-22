import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ValidityMessage as VM } from '@readme/core';
import { CommentQueryDefault as CQ } from '../comment.constant';

export class CommentQuery {
  @IsNumber()
  @Transform(({ value }) => +value || CQ.DEFAULT_COMMENT_QUERY_LIMIT)
  @IsOptional()
  public limit?= CQ.DEFAULT_COMMENT_QUERY_LIMIT;

  @IsNumber()
  @Transform(({ value }) => +value)
  @IsOptional()
  public page?: number;

  @IsIn(['asc', 'desc'], { message: VM.IsInMessage })
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' = CQ.DEFAULT_COMMENT_SORT_DIRECTION;

}
