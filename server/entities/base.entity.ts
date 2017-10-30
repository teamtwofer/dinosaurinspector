import {
  CreateDateColumn,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Base {
  @PrimaryGeneratedColumn() id: number;

  @CreateDateColumn()
  @Index()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  @Index()
  updatedAt: Date;
}
