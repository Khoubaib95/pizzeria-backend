import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { userRole } from '../user.interface';

export type UserDocument = User & mongoose.Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true, unique: true })
  username: string;
  @Prop({ type: String })
  name: string;
  @Prop({ type: String })
  password: string;
  @Prop({ type: String })
  phone?: string;
  @Prop({ type: String })
  city?: string;
  @Prop({ type: [String], default: [userRole.USER] })
  roles: [string];
}

export const UserSchema = SchemaFactory.createForClass(User);
