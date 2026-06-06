import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsString()
  name!: string;
}

export class VerifyOtpDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  @IsString()
  code!: string;
}

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body(ValidationPipe) body: RegisterDto) {
    return this.authService.register(body.email, body.password, body.name);
  }

  @Post('verify-otp')
  async verifyOtp(@Body(ValidationPipe) body: VerifyOtpDto) {
    return this.authService.verifyOtp(body.email, body.code);
  }

  @Post('login')
  async login(@Body(ValidationPipe) body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }

  @Post('verify-login-otp')
  async verifyLoginOtp(@Body(ValidationPipe) body: VerifyOtpDto) {
    return this.authService.verifyLoginOtp(body.email, body.code);
  }
}
