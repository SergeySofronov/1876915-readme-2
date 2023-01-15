import { IsEmail, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ValidityMessage as VM } from '@readme/core';

export class CreateSubscriberDto {
  @IsEmail({}, { message: VM.IsEmailMessage })
  email: string;

  @IsNotEmpty({ message: VM.IsNotEmptyMessage })
  @IsString()
  firstName: string;

  @IsNotEmpty({ message: VM.IsNotEmptyMessage })
  @IsString()
  lastName: string;

  @IsMongoId({ message: VM.MongoIdMessage })
  userId: string;
}
