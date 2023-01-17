import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { CommandEvent, User, Subscriber, NotifyPublicationDate, RabbitClient } from '@readme/shared-types';
import { createEvent } from '@readme/core'
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from '../user/user.entity';
import { UserAuthMessages } from './auth.constant';
import { UserRepository } from '../user/user.repository';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';
import { existsSync, unlinkSync } from 'fs';
import { resolve } from 'path'

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    @Inject(RabbitClient.AUTH_RABBITMQ_CLIENT) private readonly rabbitAuthClient: ClientProxy,
    @Inject(RabbitClient.PUBLICATION_RABBITMQ_CLIENT) private readonly rabbitPubClient: ClientProxy,
  ) { }

  public async register(dto: CreateUserDto) {
    const { email, password } = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (existUser) {
      throw new HttpException(UserAuthMessages.ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
    }

    const userEntity = await new UserEntity(dto).setPassword(password);
    const createdUser = await this.userRepository.create(userEntity);

    this.rabbitAuthClient.emit<unknown, Subscriber>(
      createEvent(CommandEvent.AddSubscriber),
      {
        email: createdUser.email,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        userId: createdUser._id.toString(),
      }
    );

    return createdUser;
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new HttpException(UserAuthMessages.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const userEntity = new UserEntity(existUser);
    if (! await userEntity.comparePassword(password)) {
      throw new HttpException(UserAuthMessages.WRONG_PASSWORD, HttpStatus.BAD_REQUEST);
    }

    return userEntity.toObject();
  }

  public async getUser(id: string) {
    const existUser = await this.userRepository.findById(id);
    if (!existUser) {
      throw new HttpException(UserAuthMessages.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return existUser;
  }

  public async loginUser(user: User) {
    const payload = {
      sub: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  public async notifyNewPublications(userId: string) {
    const { lastPublicationDate } = await this.getUser(userId);
    await this.updateUser(userId, { lastPublicationDate: new Date() });

    this.rabbitPubClient.emit<unknown, NotifyPublicationDate>(
      createEvent(CommandEvent.GetPublicationDate),
      {
        userId,
        lastPublicationDate,
      }
    );
  }

  public async updateUser(id: string, dto: UpdateUserDto): Promise<User> {
    const existUser = await this.getUser(id);

    console.log(existUser?.avatar)

    const userAvatar = existUser?.avatar;
    if (userAvatar && dto.avatar) {
      const avatarPath = resolve(__dirname, `${process.env.FILE_UPLOAD_DEST}/${existUser._id.toString()}/${userAvatar}`);
      if (existsSync(avatarPath)) {
        console.log(avatarPath)
        unlinkSync(avatarPath);
      }
    }
    return this.userRepository.update(id, { ...dto, updatedAt: new Date() });
  }

  public async change(id: string, { oldPassword, newPassword }: ChangeUserPasswordDto): Promise<User> {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new HttpException(UserAuthMessages.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const userEntity = new UserEntity(existUser);
    if (! await userEntity.comparePassword(oldPassword)) {
      throw new HttpException(UserAuthMessages.WRONG_PASSWORD, HttpStatus.BAD_REQUEST);
    }
    await userEntity.setPassword(newPassword);
    return this.userRepository.update(id, userEntity.toObject())
  }
}
