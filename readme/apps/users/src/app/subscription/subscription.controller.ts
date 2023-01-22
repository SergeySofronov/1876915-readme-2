import { ApiTags } from '@nestjs/swagger';
import { Controller, Body, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { fillObject, JwtAuthGuard, SubscribeParamDecorator } from '@readme/core';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionRdo } from './rdo/subscription.rdo';
import { SubscriptionService } from './subscription.service';

@ApiTags('subscriptions')
@Controller('subscriptions')
export class SubscriptionController {
  constructor(
    private readonly subscriptionService: SubscriptionService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post('/:isFollow')
  async create(@SubscribeParamDecorator('isFollow') isFollow: boolean, @Body() dto: CreateSubscriptionDto, @Res() res: Response) {
    if (isFollow) {
      const newSubscription = await this.subscriptionService.subscribe(dto);
      return res.status(HttpStatus.CREATED).json(fillObject(SubscriptionRdo, newSubscription));
    }

    await this.subscriptionService.unsubscribe(dto);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}

