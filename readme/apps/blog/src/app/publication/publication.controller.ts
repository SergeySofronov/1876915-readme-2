import { Body, Post, Controller, Delete, Param, Query, Get, Patch, HttpCode, HttpStatus, Logger, UsePipes, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { fillObject } from '@readme/core';
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
  async create(@Body() dto: CreatePublicationDto) {
    const newPublication = await this.publicationService.createPublication({ ...dto });
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

  @EventPattern({ cmd: CM.getPublicationDate })
  public async notify(dto: NotifyPublicationsDto) {
    return await this.publicationService.sendPublicationForNotify(dto);
  }
}
