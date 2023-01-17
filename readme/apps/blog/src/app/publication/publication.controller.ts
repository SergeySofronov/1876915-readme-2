import {
  Body, Post, Controller, Delete, Param, Query, Get, Patch, HttpCode,
  HttpStatus, Logger, UsePipes, UseGuards, UseInterceptors, UploadedFile, Req, Res
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { fillObject, getMulterOptions } from '@readme/core';
import { JwtAuthGuard } from '@readme/core';
import { CommandEvent as CM } from '@readme/shared-types';
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationHandleMessages } from './publication.constant';
import { PublicationRto } from './rto/publication.rto';
import { DetailedPublicationRto } from './rto/detailed-publication.rto';
import { PublicationValidationPipe } from './validation/publication-validation.pipe';
import { PublicationQuery } from './query/publication.query';
import { EventPattern } from '@nestjs/microservices';
import { NotifyPublicationsDto } from './dto/notify-publications.dto';
import contentValidationSchema from './validation/content-validation.schema'
import path = require('path');

@Controller('publications')
export class PublicationController {
  constructor(
    private readonly publicationService: PublicationService,
    private readonly logger: Logger,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    type: CreatePublicationDto,
    status: HttpStatus.CREATED,
    description: PublicationHandleMessages.CREATED,
  })
  @UsePipes(new PublicationValidationPipe(contentValidationSchema))
  async create(@Body() dto: CreatePublicationDto, @Req() req: Request) {
    const newPublication = await this.publicationService.createPublication({ ...dto, userId: req.user['sub'] });
    this.logger.log(`New publication created: ${newPublication}`);
    return fillObject(PublicationRto, newPublication);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdatePublicationDto) {
    const updatedComment = await this.publicationService.updatePublication(id, dto);
    return fillObject(PublicationRto, updatedComment);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('photo', getMulterOptions()))
  @Post('/:id/photo')
  public async upload(@Param('id') id: number, @UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    return this.publicationService.updatePublication(id, { content: { photo: file.filename } });
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('photo', getMulterOptions()))
  @Get('/photo/:image')
  public async read(@Param('image') image: string, @Req() req: Request, @Res() res: Response) {
    console.log(path.resolve(__dirname, process.env.FILE_UPLOAD_DEST, req.user['sub'], image))
    return res.sendFile(path.resolve(__dirname, process.env.FILE_UPLOAD_DEST, req.user['sub'], image));
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async show(@Param('id') id: number) {
    const existComment = await this.publicationService.getPublication(id);
    return fillObject(DetailedPublicationRto, existComment);
  }

  @Get('/')
  async index(@Query() query: PublicationQuery) {
    const publications = await this.publicationService.getPublications(query);
    return fillObject(PublicationRto, publications);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/users/drafts')
  async drafts(@Query() query: PublicationQuery) {
    const publications = await this.publicationService.getPublications(query, { isPublished: false });
    return fillObject(PublicationRto, publications);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: PublicationHandleMessages.DELETED,
  })
  async destroy(@Param('id') id: number) {
    this.publicationService.deletePublication(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('like/:isLike')
  public async like(@Param('isLike') isLike: boolean, @Req() req: Request) {
    throw new Error("Not implemented");
  }

  @UseGuards(JwtAuthGuard)
  @Post('like/:isLike')
  public async repost(@Param('isLike') isLike: boolean, @Req() req: Request) {
    throw new Error("Not implemented");
  }

  @EventPattern({ cmd: CM.GetPublicationDate })
  public async notify(dto: NotifyPublicationsDto) {
    return await this.publicationService.sendPublicationForNotify(dto);
  }
}
