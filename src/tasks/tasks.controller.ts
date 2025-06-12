import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('jwt-auth')
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() body: CreateTaskDto) {
    return this.tasksService.create(body);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get('filter')
  findFiltered(
    @Query('status') status: TaskStatus,
    @Query('priority') priority: number,
  ) {
    return this.tasksService.findFiltered(
      status,
      priority ? +priority : undefined,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Partial<Task>) {
    return this.tasksService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
