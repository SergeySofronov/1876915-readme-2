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
  @MaxLength(UV.NameMaxLength, { message: VM.MaxValueMessage })
  public firstName?: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
    required: false,
  })
  @IsOptional()
  @MinLength(UV.NameMinLength, { message: VM.MinValueMessage })
  @MaxLength(UV.NameMaxLength, { message: VM.MaxValueMessage })
  public lastName?: string;

  public avatar?: string;
  public lastPublicationDate?: Date;
}
