import { IsEmail, IsNotEmpty } from 'class-validator';
import { ValidityMessage as VM } from '@readme/core';

export class CreateSubscriberDto {
  @IsEmail({}, { message: VM.IsEmailMessage })
  email: string;

  @IsNotEmpty({ message: VM.IsNotEmptyMessage })
  firstName: string;

  @IsNotEmpty({ message: VM.IsNotEmptyMessage  })
  lastName: string;

  @IsNotEmpty({ message: VM.IsNotEmptyMessage  })
  userId: string;
}
