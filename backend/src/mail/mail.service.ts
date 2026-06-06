import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    console.log('🔧 Initializing MailService...');
    console.log(`SMTP_HOST env: ${process.env.SMTP_HOST}`);
    console.log(`SMTP_PORT env: ${process.env.SMTP_PORT}`);
    console.log(`SMTP_USER env: ${process.env.SMTP_USER}`);

    const smtpHost = process.env.SMTP_HOST || 'mailhog';
    const smtpPort = parseInt(process.env.SMTP_PORT || '1025');
    const smtpUser = process.env.SMTP_USER || 'test@example.com';
    const smtpPass = process.env.SMTP_PASS || 'password';
    const smtpSecure = process.env.SMTP_SECURE === 'true' || false;

    console.log(`📧 Configuring mail transporter: ${smtpHost}:${smtpPort}`);

    this.transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });
  }

  async sendOTP(to: string, code: string, name: string) {
    try {
      console.log(`📨 Attempting to send OTP to ${to}`);
      const smtpFrom = process.env.SMTP_FROM || 'noreply@securetodo.com';

      const result = await this.transporter.sendMail({
        from: smtpFrom,
        to,
        subject: '🔐 Verify Your Email - OTP Code',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Email Verification</h2>
            <p>Hi <strong>${name}</strong>,</p>
            <p>Your One-Time Password (OTP) code is:</p>
            <h1 style="color: #007bff; font-weight: bold; letter-spacing: 3px; background: #f5f5f5; padding: 20px; border-radius: 5px; text-align: center;">${code}</h1>
            <p style="color: #666;">This code is valid for <strong>10 minutes</strong>.</p>
            <p style="color: #999; font-size: 12px;">If you didn't request this, please ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="color: #999; font-size: 12px;">Best regards,<br><strong>Security Team</strong></p>
          </div>
        `,
      });
      console.log(`✅ OTP email sent successfully to ${to}. Response:`, result);
      return true;
    } catch (error) {
      const err = error as any;
      console.error('❌ Failed to send OTP email:', err?.message || String(error));
      console.error('Full error:', error);
      throw new Error(`Email sending failed: ${err?.message || String(error)}`);
    }
  }

  async sendLoginAlert(to: string, name: string) {
    try {
      console.log(`📨 Attempting to send login alert to ${to}`);
      const smtpFrom = process.env.SMTP_FROM || 'noreply@securetodo.com';

      await this.transporter.sendMail({
        from: smtpFrom,
        to,
        subject: '🔐 New Login Detected',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #ff6b6b;">Security Alert</h2>
            <p>Hi <strong>${name}</strong>,</p>
            <p>A new login to your account was detected at ${new Date().toLocaleString()}.</p>
            <p style="color: #666;">If this wasn't you, please <a href="#" style="color: #007bff; text-decoration: none;"><strong>change your password</strong></a> immediately.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="color: #999; font-size: 12px;">Best regards,<br><strong>Security Team</strong></p>
          </div>
        `,
      });
      console.log(`✅ Login alert sent to ${to}`);
      return true;
    } catch (error) {
      const err = error as any;
      console.error('❌ Failed to send login alert email:', err?.message || String(error));
    }
  }

  async sendRegistrationConfirmation(to: string, name: string) {
    try {
      console.log(`📨 Attempting to send registration confirmation to ${to}`);
      const smtpFrom = process.env.SMTP_FROM || 'noreply@securetodo.com';

      await this.transporter.sendMail({
        from: smtpFrom,
        to,
        subject: '✅ Account Created Successfully',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #28a745;">Welcome to Secure To-Do!</h2>
            <p>Hi <strong>${name}</strong>,</p>
            <p>Your account has been created successfully and your email is verified.</p>
            <p>You can now log in and start managing your tasks securely.</p>
            <a href="http://localhost:3000" style="display: inline-block; background: #007bff; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; margin: 20px 0;">Go to Dashboard</a>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="color: #999; font-size: 12px;">Best regards,<br><strong>Security Team</strong></p>
          </div>
        `,
      });
      console.log(`✅ Registration confirmation email sent to ${to}`);
      return true;
    } catch (error) {
      const err = error as any;
      console.error('❌ Failed to send registration confirmation email:', err?.message || String(error));
    }
  }
}
