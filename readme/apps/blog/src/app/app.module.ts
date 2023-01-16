import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommentModule } from './comment/comment.module';
import { jwtOptions, rabbitMqOptions } from '@readme/core';
import { PublicationModule } from './publication/publication.module';
import { PrismaModule } from './prisma/prisma.module';
import { ENV_FILE_PATH_COMMON } from './app.constant';
import { envValidationSchema } from './env.validation.schema';

@Module({
  imports: [
    CommentModule,
    PublicationModule,
    PrismaModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: [ENV_FILE_PATH_COMMON],
      load: [jwtOptions, rabbitMqOptions],
      validationSchema: envValidationSchema,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
