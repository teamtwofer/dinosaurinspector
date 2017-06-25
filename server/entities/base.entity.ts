import {
  AbstractEntity,
  CreateDateColumn,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@AbstractEntity()
export class Base {
  @PrimaryGeneratedColumn() id: number;

  @CreateDateColumn()
  @Index()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  @Index()
  updatedAt: Date;
}
