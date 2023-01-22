import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { getRabbitMqConfig } from '@readme/core';
import { NotifyQueue } from '@readme/shared-types';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  //Создаем очередь Publications
  app.connectMicroservice(getRabbitMqConfig(configService, NotifyQueue.getPublications));
  await app.startAllMicroservices();
  Logger.log(`🚀 Notify service is running on`);

  const config = new DocumentBuilder()
    .setTitle('Blog «Readme»')
    .setDescription('Blog «Readme» service API')
    .setVersion('1.0')
    .build();

  const globalPrefix = 'blog';
  app.setGlobalPrefix(globalPrefix);

  const document = SwaggerModule.createDocument(app, config, { ignoreGlobalPrefix: false });
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const port = process.env.APP_PORT;
  await app.listen(port);

  Logger.log(
    `🚀 REST is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
