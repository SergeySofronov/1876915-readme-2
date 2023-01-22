import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { HttpModule } from '@nestjs/axios';
import { getHttpOptions } from '../config/bff.config';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getHttpOptions,
      inject: [ConfigService]
    }),
    UsersModule
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule { }
