import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { fileUploadOptions, getMongoDbConfig, jwtOptions, mongoDbOptions, rabbitMqOptions } from '@readme/core';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ENV_FILE_PATH_COMMON, ENV_FILE_PATH_USERS } from './app.constant';
import { SubscriptionModule } from './subscription/subscription.module';
import { envValidationSchema } from './env.validation.schema';

/*
Примечания.
1. Применение forRoot/forRootAsync/forFeature/forFeatureAsync (в каких-то модулях это могут быть
  методы типа register)- это runtime подключение (import) динамических модулей.
2. В объект с настройками ConfigModule в свойстве load указывается массив коллбэков для
извлечения env-переменных в "пространство имен" (по сути это просто объекты, в данном
случае с названием "database")
3. Подключение модуля mongoose осуществляется через асинхронный метод forRootAsync,
т.к. env-переменные должны быть сначала подготовлены в ConfigModule в синхронном режиме.
*/

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: [ENV_FILE_PATH_USERS, ENV_FILE_PATH_COMMON],
      load: [mongoDbOptions, jwtOptions, rabbitMqOptions, fileUploadOptions],
      validationSchema: envValidationSchema,
    }),
    MongooseModule.forRootAsync(getMongoDbConfig()),
    UserModule,
    AuthModule,
    SubscriptionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
