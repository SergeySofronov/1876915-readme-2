import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '@readme/shared-types';

@Schema({
  collection: 'users',
})
export class UserModel extends Document implements User {
  @Prop({ required: true, trim: true, unique: true })
  public email: string;

  @Prop({ required: true, trim: true })
  public firstName: string;

  @Prop({ required: true, trim: true })
  public lastName: string;

  @Prop({ trim: true, default: '' })
  public avatar: string;

  @Prop({ required: true, trim: true, default: new Date() })
  public createdAt: Date;

  @Prop({ required: true, trim: true, default: new Date() })
  public updatedAt: Date;

  @Prop({ required: true, trim: true })
  public password: string;

  @Prop({ required: true, min: 0, default: 0 })
  public publicationCount: number;

  @Prop({ required: true, min: 0, default: 0 })
  public subscribersCount: number;

  @Prop({ required: true, trim: true, default: new Date() })
  public lastPublicationDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
