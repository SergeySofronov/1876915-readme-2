import { HttpService } from '@nestjs/axios';
import { AxiosError, AxiosResponse } from 'axios'
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Request } from 'express'
import { microserviceBlogOptions, microserviceUsersOptions } from '../config/bff.config';
import { BlogEndPoints } from './blog.constant';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { catchError, firstValueFrom } from 'rxjs';
@Injectable()
export class BlogService {
  private readonly blogMsUrl: string;
  private readonly usersMsUrl: string;

  constructor(
    private readonly httpService: HttpService,
    @Inject(microserviceUsersOptions.KEY)
    private readonly usersConfig: ConfigType<typeof microserviceUsersOptions>,
    @Inject(microserviceBlogOptions.KEY)
    private readonly blogConfig: ConfigType<typeof microserviceBlogOptions>,
  ) {
    this.blogMsUrl = `http://${blogConfig.host}:${blogConfig.port}/${blogConfig.name}`;
    this.usersMsUrl = `http://${usersConfig.host}:${usersConfig.port}/${usersConfig.name}`;
    console.log(this.blogMsUrl)
  }

  public async createPublication(dto: CreatePublicationDto, req: Request) {
    const headers = { 'Authorization': req.headers['authorization'] }
    const { data } = await firstValueFrom(
      this.httpService.post<CreatePublicationDto>(`${this.blogMsUrl}/${BlogEndPoints.Publication}`, dto, { headers, }).pipe(
        catchError((error: AxiosError<{ message: string, statusCode: number }, AxiosResponse>) => {
          throw new HttpException(error.response.data.message, error.response.data.statusCode);
        }),
      ),
    );

    return data;
  }

  public async getFeed(req: Request) {
    const headers = { 'Authorization': req.headers['authorization'] }
    const queryIndex = req.url.indexOf('?');
    const queryString = req.url.slice(queryIndex);

    const { data } = await firstValueFrom(
      this.httpService.get<CreatePublicationDto>(`${this.blogMsUrl}/${BlogEndPoints.Publication}${queryString}`, { headers }).pipe(
        catchError((error: AxiosError<{ message: string, statusCode: number }, AxiosResponse>) => {
          throw new HttpException(error.response.data.message, error.response.data.statusCode);
        }),
      ),
    );

    return data;
  }
}
