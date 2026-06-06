import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) {}

  async create(userId: string, createTaskDto: CreateTaskDto) {
    const task = this.taskRepository.create({
      ...createTaskDto,
      userId,
    });
    return this.taskRepository.save(task);
  }

  async findAll(userId: string) {
    return this.taskRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, userId: string) {
    const task = await this.taskRepository.findOne({
      where: { id, userId },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async update(id: string, userId: string, updateTaskDto: UpdateTaskDto) {
    await this.findOne(id, userId);
    await this.taskRepository.update({ id, userId }, updateTaskDto);
    return this.findOne(id, userId);
  }

  async remove(id: string, userId: string) {
    const task = await this.findOne(id, userId);
    await this.taskRepository.remove(task);
    return { message: 'Task deleted successfully' };
  }

  async toggleComplete(id: string, userId: string) {
    const task = await this.findOne(id, userId);
    task.completed = !task.completed;
    return this.taskRepository.save(task);
  }
}
