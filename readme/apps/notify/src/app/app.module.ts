import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoDbConfig, mongoDbOptions, rabbitMqOptions } from '@readme/core';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';
import { envValidationSchema } from './env.validation.schema';
import { MailModule } from './mail/mail.module';
import { mailOptions } from './mail/config/mail.config';
import { EnvPath } from './app.constant';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: [EnvPath.ENV_FILE_PATH_NOTIFY, EnvPath.ENV_FILE_PATH_COMMON],
      load: [mongoDbOptions, rabbitMqOptions, mailOptions],
      validationSchema: envValidationSchema,
    }),
    MongooseModule.forRootAsync(getMongoDbConfig()),
    EmailSubscriberModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
