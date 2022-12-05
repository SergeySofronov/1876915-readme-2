import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserRdo } from './user.rdo';

export class DetailedUserRdo extends UserRdo {
  @ApiProperty({
    description: 'User registration date',
    example: '2021-12-12T21:55:28.147Z',
  })
  @Expose()
  public createdAt: string;

  @ApiProperty({
    description: 'Date of user data update',
    example: '2021-12-12T21:55:28.147Z',
  })
  @Expose()
  public updatedAt: string;

  @ApiProperty({
    description: 'Total number of user publications',
    example: '2021-12-12T21:55:28.147Z',
  })
  @Expose()
  public publicationCount: string;  // BFF (from 'publications' module)

  @ApiProperty({
    description: 'The total number of subscribers of the user',
    example: '2021-12-12T21:55:28.147Z',
  })
  @Expose()
  public subscribersCount: string;  //BFF (from 'feed' module)
}
