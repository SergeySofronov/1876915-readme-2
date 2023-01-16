import { Injectable } from '@nestjs/common'
import { genSalt, hash, compare } from 'bcrypt';
import { SALT_ROUNDS } from './user.constant';
import { User } from '@readme/shared-types'
import { Entity } from '@readme/core';

@Injectable()
export class UserEntity implements Entity<UserEntity, User>, User {
  public _id: string;
  public avatar: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public password: string;
  public createdAt: Date;
  public updatedAt: Date;
  public lastPublicationDate: Date;

  constructor(user: User) {
    this.fillEntity(user);
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.password = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(user: User) {
    this._id = user._id;
    this.avatar = user.avatar;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.password = user.password;
    this.createdAt = user.createdAt || new Date();
    this.updatedAt = user.updatedAt || new Date();
    this.lastPublicationDate = user.lastPublicationDate || new Date();
  }
}
