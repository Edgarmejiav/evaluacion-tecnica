import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

@Schema()
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ enum: TaskStatus, default: TaskStatus.OPEN })
  status: TaskStatus;

  @Prop()
  dueDate: Date;

  @Prop({ default: 0 })
  priority: number;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
