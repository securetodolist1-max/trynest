import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

@Entity('otps')
@Index(['email', 'code'])
export class OTP {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  email!: string;

  @Column()
  code!: string;

  @Column()
  isUsed!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  expiresAt!: Date;
}
