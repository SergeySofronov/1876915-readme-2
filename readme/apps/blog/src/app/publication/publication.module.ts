import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { MulterModule } from '@nestjs/platform-express/multer';
import { getFileUploadConfig, getRabbitMqConfig, JwtStrategy } from '@readme/core';
import { NotifyQueue, RabbitClient } from '@readme/shared-types';
import { PublicationController } from './publication.controller';
import { PublicationRepository } from './publication.repository';
import { PublicationService } from './publication.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getFileUploadConfig,
    }),
    ClientsModule.registerAsync([
      {
        name: RabbitClient.PUBLICATION_RABBITMQ_CLIENT,
        useFactory: (configService: ConfigService) => getRabbitMqConfig(configService, NotifyQueue.sendPublications),
        inject: [ConfigService]
      }
    ]),
  ],
  controllers: [PublicationController],
  providers: [PublicationService, PublicationRepository, JwtStrategy, Logger],
  exports: [PublicationRepository],
})
export class PublicationModule { }
