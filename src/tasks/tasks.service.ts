import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(data: CreateTaskDto) {
    try {
      const task = new this.taskModel(data);
      return await task.save();
    } catch (error) {
      throw new BadRequestException('Invalid task data');
    }
  }

  async findAll() {
    try {
      return await this.taskModel.find();
    } catch {
      throw new InternalServerErrorException('Failed to fetch tasks');
    }
  }

  async findOne(id: string) {
    try {
      const task = await this.taskModel.findById(id);
      if (!task) {
        throw new NotFoundException(`Task with id ${id} not found`);
      }
      return task;
    } catch {
      throw new BadRequestException('Invalid task ID');
    }
  }

  async update(id: string, data: Partial<Task>) {
    try {
      const task = await this.taskModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (!task) {
        throw new NotFoundException(`Task with id ${id} not found`);
      }
      return task;
    } catch {
      throw new BadRequestException('Invalid data or ID');
    }
  }

  async remove(id: string) {
    try {
      const result = await this.taskModel.findByIdAndDelete(id);
      if (!result) {
        throw new NotFoundException(`Task with id ${id} not found`);
      }
    } catch {
      throw new BadRequestException('Invalid task ID');
    }
  }
}
