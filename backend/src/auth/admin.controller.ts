import { Controller, Get, Post, Delete, Body, Param, UseGuards, BadRequestException, Req } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtGuard } from './jwt.guard';
import { Request } from 'express';

@Controller('admin')
export class AdminController {
  constructor(private usersService: UsersService) {}

  @Get('users')
  @UseGuards(JwtGuard)
  async getAllUsers(@Req() req: Request & { user: any }) {
    // Verify admin role
    if (req.user.role !== 'ADMIN') {
      throw new BadRequestException('Only admins can access this endpoint');
    }
    const users = await this.usersService.getAllUsers();
    return users.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      verified: u.isVerified,
      locked: u.locked,
      created_at: u.createdAt,
      delete_url: `/admin/users/${u.id}`
    }));
  }

  @Delete('users/:id')
  @UseGuards(JwtGuard)
  async deleteUser(@Param('id') id: string, @Req() req: Request & { user: any }) {
    // Verify admin role
    if (req.user.role !== 'ADMIN') {
      throw new BadRequestException('Only admins can delete users');
    }
    try {
      return await this.usersService.deleteUser(id);
    } catch (error) {
      throw new BadRequestException((error as Error).message);
    }
  }

  @Post('users/:id/lock')
  @UseGuards(JwtGuard)
  async lockUser(@Param('id') id: string, @Req() req: Request & { user: any }) {
    if (req.user.role !== 'ADMIN') {
      throw new BadRequestException('Only admins can lock users');
    }
    await this.usersService.lockUser(id);
    return { message: 'User locked successfully' };
  }

  @Post('users/:id/unlock')
  @UseGuards(JwtGuard)
  async unlockUser(@Param('id') id: string, @Req() req: Request & { user: any }) {
    if (req.user.role !== 'ADMIN') {
      throw new BadRequestException('Only admins can unlock users');
    }
    await this.usersService.unlockUser(id);
    return { message: 'User unlocked successfully' };
  }
}
