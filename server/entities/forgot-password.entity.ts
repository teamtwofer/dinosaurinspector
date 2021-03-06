import {
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class ForgotPassword {
  @PrimaryGeneratedColumn('uuid') id: string;

  @CreateDateColumn()
  @Index()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  @Index()
  updatedAt: Date;

  @ManyToOne(_type => User, user => user.forgotPasswords, {
    cascadeAll: true,
  })
  user: User;
}
