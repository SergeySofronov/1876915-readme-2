import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Blog «Readme»')
    .setDescription('Blog «Readme» service API')
    .setVersion('1.0')
    .build();

  const globalPrefix = 'blog';
  app.setGlobalPrefix(globalPrefix);

  const document = SwaggerModule.createDocument(app, config, { ignoreGlobalPrefix: false });
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3334;
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
