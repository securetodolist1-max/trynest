import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async findOne(id: string) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async lockUser(id: string) {
    await this.userRepository.update(id, { locked: true });
  }

  async unlockUser(id: string) {
    await this.userRepository.update(id, { locked: false });
  }

  async getAllUsers() {
    return this.userRepository.find();
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    await this.userRepository.remove(user);
    return { message: 'User deleted successfully' };
  }

  async deleteUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    await this.userRepository.remove(user);
    return { message: 'User deleted successfully' };
  }
}
