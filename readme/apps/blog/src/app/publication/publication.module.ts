import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { getRabbitMqConfig, JwtStrategy } from '@readme/core';
import { NotifyQueue, RabbitClient } from '@readme/shared-types';
import { PublicationController } from './publication.controller';
import { PublicationRepository } from './publication.repository';
import { PublicationService } from './publication.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: RabbitClient.PUBLICATION_RABBITMQ_CLIENT,
        useFactory: (configService: ConfigService)=>getRabbitMqConfig(configService, NotifyQueue.sendPublications),
        inject: [ConfigService]
      }
    ]),
  ],
  controllers: [PublicationController],
  providers: [PublicationService, PublicationRepository, JwtStrategy, Logger],
  exports: [PublicationRepository],
})
export class PublicationModule { }
