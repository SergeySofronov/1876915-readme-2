import { Document } from 'mongoose';
import { Subscriber } from '@readme/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

const SUBSCRIBERS_COLLECTION_NAME = 'email-subscribers';

@Schema({
  collection: SUBSCRIBERS_COLLECTION_NAME,
  timestamps: true,
})
export class EmailSubscriberModel extends Document implements  Subscriber {
  @Prop({ required: true, trim: true })
  public email: string;

  @Prop({ required: true, trim: true })
  public firstName: string;

  @Prop({ required: true, trim: true })
  public lastName: string;

  @Prop({ required: true, trim: true })
  public userId: string;
}

export const EmailSubscriberSchema = SchemaFactory.createForClass(EmailSubscriberModel);
