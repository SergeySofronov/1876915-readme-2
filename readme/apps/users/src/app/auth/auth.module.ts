import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ClientsModule } from '@nestjs/microservices';
import { getFileUploadConfig, getJwtConfig, getRabbitMqConfig, JwtStrategy } from '@readme/core';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { NotifyQueue, RabbitClient } from '@readme/shared-types';
import { MulterModule } from '@nestjs/platform-express/multer';

@Module({
  imports: [
    UserModule,
    PassportModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getFileUploadConfig,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    ClientsModule.registerAsync([
      {
        name: RabbitClient.AUTH_RABBITMQ_CLIENT,
        useFactory: (configService: ConfigService) => getRabbitMqConfig(configService, NotifyQueue.Subscribers),
        inject: [ConfigService]
      },
      {
        name: RabbitClient.PUBLICATION_RABBITMQ_CLIENT,
        useFactory: (configService: ConfigService) => getRabbitMqConfig(configService, NotifyQueue.getPublications),
        inject: [ConfigService]
      }
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule { }
