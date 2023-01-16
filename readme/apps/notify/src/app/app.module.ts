import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ENV_FILE_PATH_NOTIFY, ENV_FILE_PATH_COMMON } from './app.constant';
import { getMongoDbConfig, mongoDbOptions, rabbitMqOptions } from '@readme/core';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';
import { envValidationSchema } from './env.validation.schema';
import { MailModule } from './mail/mail.module';
import { mailOptions } from './mail/config/mail.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: [ENV_FILE_PATH_NOTIFY, ENV_FILE_PATH_COMMON],
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
