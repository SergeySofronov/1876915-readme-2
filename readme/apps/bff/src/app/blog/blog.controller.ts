import { Controller, Post, Get, HttpStatus, HttpCode, Body, Req } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express'
import { fillObject } from '@readme/core';
import { BlogEndPoints, PublicationHandleMessages } from './blog.constant';
import { BlogService } from './blog.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { PublicationRto } from './rto/publication.rto';

@ApiTags('blog')
@Controller('blog')
export class BlogController {
  constructor(
    private readonly blogService: BlogService
  ) { }

  @Post(`/${BlogEndPoints.Publication}`)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    type: CreatePublicationDto,
    status: HttpStatus.CREATED,
    description: PublicationHandleMessages.CREATED,
  })
  public async create(@Body() dto: CreatePublicationDto, @Req() req: Request) {
    const publication = await this.blogService.createPublication(dto, req);
    return fillObject(PublicationRto, publication);
  }

  @Get(`/${BlogEndPoints.Publication}`)
  @ApiResponse({
    type: CreatePublicationDto,
    status: HttpStatus.OK,
    description: PublicationHandleMessages.FEED,
  })
  public async feed(@Req() req: Request) {
    const publication = await this.blogService.getFeed(req);
    return fillObject(PublicationRto, publication);
  }
}
