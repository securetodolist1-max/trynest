import { Controller, Get, Post, Body, Patch, Delete, Param, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtGuard } from '../auth/jwt.guard';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';

@Controller('tasks')
@UseGuards(JwtGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async findAll(@Request() req: any) {
    return this.tasksService.findAll(req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req: any) {
    return this.tasksService.findOne(id, req.user.id);
  }

  @Post()
  async create(@Body(ValidationPipe) createTaskDto: CreateTaskDto, @Request() req: any) {
    return this.tasksService.create(req.user.id, createTaskDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateTaskDto: UpdateTaskDto,
    @Request() req: any,
  ) {
    return this.tasksService.update(id, req.user.id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req: any) {
    return this.tasksService.remove(id, req.user.id);
  }

  @Patch(':id/toggle')
  async toggleComplete(@Param('id') id: string, @Request() req: any) {
    return this.tasksService.toggleComplete(id, req.user.id);
  }
}
