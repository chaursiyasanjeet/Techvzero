import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class TechvUser {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, select: false })
  email: string;
  @Prop({ required: true, select: false })
  mobile: number;

  @Prop({ required: true })
  password: string;

  @Prop()
  notes: Array<any>;
}

const schema = SchemaFactory.createForClass(TechvUser);

export const UserSchema = schema;

export const USER_MODEL = TechvUser.name;
