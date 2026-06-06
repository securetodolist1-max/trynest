import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class AdminService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async getAllUsers() {
    const users = await this.userRepository.find({
      select: ['id', 'name', 'email', 'role', 'locked', 'isVerified', 'createdAt'],
      relations: ['tasks'],
    });

    return {
      message: 'Users retrieved successfully',
      count: users.length,
      users,
    };
  }

  async getUserDetails(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['tasks'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      message: 'User details retrieved successfully',
      user,
    };
  }

  async lockUser(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.locked) {
      throw new BadRequestException('User is already locked');
    }

    await this.userRepository.update(userId, { locked: true });

    return {
      message: 'User locked successfully',
      user: {
        id: user.id,
        email: user.email,
        locked: true,
      },
    };
  }

  async unlockUser(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.locked) {
      throw new BadRequestException('User is not locked');
    }

    await this.userRepository.update(userId, { locked: false });

    return {
      message: 'User unlocked successfully',
      user: {
        id: user.id,
        email: user.email,
        locked: false,
      },
    };
  }
}
