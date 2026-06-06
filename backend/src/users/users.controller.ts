import { Controller, Get, Delete, Param, UseGuards, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('all')
  @UseGuards(JwtGuard)
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  async getUser(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async deleteUser(@Param('id') id: string) {
    try {
      return await this.usersService.deleteUser(id);
    } catch (error) {
      throw new BadRequestException((error as Error).message);
    }
  }

  @Delete('email/:email')
  @UseGuards(JwtGuard)
  async deleteUserByEmail(@Param('email') email: string) {
    try {
      return await this.usersService.deleteUserByEmail(email);
    } catch (error) {
      throw new BadRequestException((error as Error).message);
    }
  }
}
