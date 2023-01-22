import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvPath } from './app.constant';
import { HttpOptions, microserviceUsersOptions, microserviceBlogOptions } from './config/bff.config';
import { envValidationSchema } from './env.validation.schema';
import { UsersModule } from './users/users.module';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: [EnvPath.ENV_FILE_PATH_BFF],
      load: [microserviceUsersOptions, microserviceBlogOptions, HttpOptions],
      validationSchema: envValidationSchema,
    }),
    UsersModule,
    BlogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
