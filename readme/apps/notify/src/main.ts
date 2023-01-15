import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { getRabbitMqConfig } from '@readme/core';
import { NotifyQueue } from '@readme/shared-types';
import { AppModule } from './app/app.module';

// Как я понял, для RabbitMQ нет модуля для nest (типа @nestjs/rabbitmq)),
// поэтому подключение осуществляется через connectMicroservice() или createMicroservice()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  //Создаем две очереди Subscribers и Publications
  app.connectMicroservice(getRabbitMqConfig(configService, NotifyQueue.Subscribers));
  app.connectMicroservice(getRabbitMqConfig(configService, NotifyQueue.Publications));

  await app.startAllMicroservices();
  Logger.log(`🚀 Notify service is running on`);

  const globalPrefix = 'notify';
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const port = process.env.PORT || 3335;
  await app.listen(port);

  Logger.log(
    `🚀 REST is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
