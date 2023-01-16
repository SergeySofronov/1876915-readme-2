import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MaxLength, MinLength } from 'class-validator';
import { ValidityMessage as VM } from '@readme/core';
import { UserValidity as UV } from '../auth.constant';

export class UpdateUserDto {
  @ApiProperty({
    description: 'User first name',
    example: 'John',
    required: false,
  })
  @IsOptional()
  @MinLength(UV.NameMinLength, { message: VM.MinValueMessage })
  @MaxLength(UV.NameMinLength, { message: VM.MaxValueMessage })
  public firstName?: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
    required: false,
  })
  @IsOptional()
  @MinLength(UV.NameMinLength, { message: VM.MinValueMessage })
  @MaxLength(UV.NameMinLength, { message: VM.MaxValueMessage })
  public lastName?: string;

  public lastPublicationDate?: Date;
}
