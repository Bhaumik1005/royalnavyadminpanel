import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ lowercase: true})
  userName: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password?: string;

  @Prop({default: 1 })
  isUserActive: number;

  @Prop()
  profilePicURL: string;

  @Prop()
  organizationName: string;

  @Prop()
  countryOfOrigin: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
