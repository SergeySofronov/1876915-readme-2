import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommentModule } from './comment/comment.module';
import { fileUploadOptions, jwtOptions, rabbitMqOptions } from '@readme/core';
import { PublicationModule } from './publication/publication.module';
import { PrismaModule } from './prisma/prisma.module';
import { envValidationSchema } from './env.validation.schema';
import { EnvPath } from './app.constant';

@Module({
  imports: [
    CommentModule,
    PublicationModule,
    PrismaModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: [EnvPath.ENV_FILE_PATH_BLOG, EnvPath.ENV_FILE_PATH_COMMON],
      load: [jwtOptions, rabbitMqOptions, fileUploadOptions],
      validationSchema: envValidationSchema,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
