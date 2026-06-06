import { Injectable, ConflictException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { OTP } from './otp.entity';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(OTP) private otpRepository: Repository<OTP>,
    private mailService: MailService,
  ) {}

  private generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async register(email: string, password: string, name: string) {
    const existingUser = await this.userRepository.findOne({ where: { email } });
    
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await this.hashPassword(password);
    
    // Create user but mark as not verified
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      name,
      role: 'USER',
      isVerified: false,
    });

    const savedUser = await this.userRepository.save(user);

    // Generate and send OTP
    const otp = this.generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await this.otpRepository.save({
      email,
      code: otp,
      isUsed: false,
      expiresAt,
    });

    // Send OTP email - will throw error if SMTP not configured
    try {
      await this.mailService.sendOTP(email, otp, name);
    } catch (error) {
      // Delete the user if email fails to maintain consistency
      await this.userRepository.delete(savedUser.id);
      const err = error as any;
      throw new BadRequestException(
        `Failed to send verification email: ${err?.message || String(error)}. Make sure SMTP is configured.`
      );
    }

    return {
      message: 'Registration successful. Please verify your email with the OTP sent.',
      email: savedUser.email,
      requiresOtpVerification: true,
    };
  }

  async verifyOtp(email: string, code: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.isVerified) {
      throw new BadRequestException('Account already verified');
    }

    const otp = await this.otpRepository.findOne({
      where: { email, code, isUsed: false },
    });

    if (!otp) {
      throw new BadRequestException('Invalid OTP');
    }

    if (new Date() > otp.expiresAt) {
      throw new BadRequestException('OTP has expired');
    }

    // Mark OTP as used
    otp.isUsed = true;
    await this.otpRepository.save(otp);

    // Mark user as verified
    user.isVerified = true;
    await this.userRepository.save(user);

    await this.mailService.sendRegistrationConfirmation(email, user.name);

    return {
      message: 'Email verified successfully. You can now login.',
      email: user.email,
    };
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user || !(await this.comparePassword(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.locked) {
      throw new UnauthorizedException('Account is locked');
    }

    // ADMIN: Direct login without OTP - no email verification required
    if (user.role === 'ADMIN') {
      const payload = {
        sub: user.id,
        email: user.email,
        role: user.role,
      };

      return {
        message: 'Admin login successful',
        access_token: this.jwtService.sign(payload),
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      };
    }

    if (!user.isVerified) {
      throw new UnauthorizedException('Please verify your email first');
    }

    // REGULAR USER: Send OTP for login
    const otp = this.generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save OTP to database
    await this.otpRepository.save({
      email,
      code: otp,
      isUsed: false,
      expiresAt,
    });

    // Send OTP email
    try {
      await this.mailService.sendOTP(email, otp, user.name);
    } catch (error) {
      const err = error as any;
      throw new BadRequestException(
        `Failed to send login OTP: ${err?.message || String(error)}`
      );
    }

    return {
      message: 'OTP sent to your email. Please verify to complete login.',
      email: user.email,
      requiresLoginOTP: true,
    };
  }

  async verifyLoginOtp(email: string, code: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const otp = await this.otpRepository.findOne({
      where: { email, code, isUsed: false },
    });

    if (!otp) {
      throw new BadRequestException('Invalid OTP');
    }

    if (new Date() > otp.expiresAt) {
      throw new BadRequestException('OTP has expired');
    }

    // Mark OTP as used
    otp.isUsed = true;
    await this.otpRepository.save(otp);

    // Send login alert
    await this.mailService.sendLoginAlert(email, user.name);

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      message: 'Login successful',
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  async validateUser(userId: string) {
    return this.userRepository.findOne({ where: { id: userId } });
  }
}
