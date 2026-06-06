import { Controller, Get, Post, Param, UseGuards, Body, ValidationPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { IsUUID } from 'class-validator';

export class LockUserDto {
  @IsUUID()
  userId!: string;
}

@Controller('admin')
@UseGuards(JwtGuard, RolesGuard)
@Roles('ADMIN')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('users')
  async getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Post('users/:id/lock')
  async lockUser(@Param('id') userId: string) {
    return this.adminService.lockUser(userId);
  }

  @Post('users/:id/unlock')
  async unlockUser(@Param('id') userId: string) {
    return this.adminService.unlockUser(userId);
  }

  @Get('users/:id')
  async getUserDetails(@Param('id') userId: string) {
    return this.adminService.getUserDetails(userId);
  }
}
