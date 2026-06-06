import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';

@Injectable()
export class AdminSeed {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async seed() {
    try {
      const adminExists = await this.userRepository.findOne({
        where: { email: 'admin@gmail.com' },
      });

      if (!adminExists) {
        const hashedPassword = await bcrypt.hash('admin123', 10);

        const admin = this.userRepository.create({
          name: 'Admin User',
          email: 'admin@gmail.com',
          password: hashedPassword,
          role: 'ADMIN',
          isVerified: true,
          locked: false,
        });

        await this.userRepository.save(admin);
        console.log('✅ Admin user created: admin@gmail.com / admin123');
      } else {
        console.log('✅ Admin user already exists');
      }
    } catch (error) {
      console.error('❌ Error seeding admin user:', error);
    }
  }
}
