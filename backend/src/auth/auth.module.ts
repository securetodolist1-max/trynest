import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminController } from './admin.controller';
import { JwtStrategy } from './jwt.strategy';
import { JwtGuard } from './jwt.guard';
import { RolesGuard } from './roles.guard';
import { User } from '../users/user.entity';
import { OTP } from './otp.entity';
import { MailService } from '../mail/mail.service';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your_secret_key',
      signOptions: { expiresIn: '24h' },
    }),
    TypeOrmModule.forFeature([User, OTP]),
  ],
  controllers: [AuthController, AdminController],
  providers: [AuthService, JwtStrategy, JwtGuard, RolesGuard, MailService, UsersService],
  exports: [AuthService, JwtGuard, RolesGuard],
})
export class AuthModule {}
