import { IsEmail, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ValidityMessage as VM } from '@readme/core';

export class CreateSubscriberDto {
  @IsEmail({}, { message: VM.IsEmailMessage })
  public email: string;

  @IsNotEmpty({ message: VM.IsNotEmptyMessage })
  @IsString()
  public firstName: string;

  @IsNotEmpty({ message: VM.IsNotEmptyMessage })
  @IsString()
  public lastName: string;

  @IsMongoId({ message: VM.MongoIdMessage })
  public userId: string;
}
