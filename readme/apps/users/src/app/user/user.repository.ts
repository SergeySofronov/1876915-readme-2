import { CRUDRepositoryInterface } from '@readme/core';
import { UserEntity } from './user.entity';
import { User } from '@readme/shared-types';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from './user.model';
import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UserRepository implements CRUDRepositoryInterface<UserEntity, string, User> {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserModel>,
    private readonly logger: Logger,
  ) { }

  public async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  public async create(dto: UserEntity): Promise<User> {
    const newUser = await this.userModel.create(dto);
    this.logger.log(`New user created: ${newUser.email}`)

    return newUser;
  }

  public async update(id: string, item: Partial<User>): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, item, { new: true }).exec();
  }

  public async destroy(id: string): Promise<void> {
    this.userModel.findByIdAndDelete(id).exec();
  }

  public async addSubscribersCount(id: string, count: number): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, { '$inc': { subscribersCount: count } }, { new: true }).exec();
  }

  public async addPublicationCount(id: string, count: number): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, { '$inc': { publicationCount: count } }, { new: true }).exec();
  }
}
