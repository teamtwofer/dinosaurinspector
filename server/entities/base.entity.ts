import {
  AbstractEntity,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@AbstractEntity()
export class Base {
  @PrimaryGeneratedColumn() id: number;

  @CreateDateColumn()
  @Index()
  createdAt: Date;

  @Column({ nullable: true })
  @Index()
  updatedAt: Date;

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }
}
