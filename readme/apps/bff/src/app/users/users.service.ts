import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { microserviceUsersOptions } from '../config/bff.config';

@Injectable()
export class UsersService {
  private readonly usersMsUrl: string;

  constructor(
    private readonly httpService: HttpService,
    @Inject(microserviceUsersOptions.KEY)
    private readonly usersConfig: ConfigType<typeof microserviceUsersOptions>,
  ) {
    this.usersMsUrl = `http://${usersConfig.host}:${usersConfig.port}/${usersConfig.name}/`;
  }
}
