import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminSeed } from './admin.seed';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AdminSeed],
  exports: [AdminSeed],
})
export class SeedsModule {}
