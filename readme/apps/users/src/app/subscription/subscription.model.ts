import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Subscription } from '@readme/shared-types';

@Schema({
  collection: 'subscription',
})
export class SubscriptionModel extends Document implements Subscription {

  @Prop({ required: true, trim: true })
  public bloggerId: string;

  @Prop({ required: true, trim: true })
  public followerId: string;
}

export const SubscriptionSchema = SchemaFactory.createForClass(SubscriptionModel);
