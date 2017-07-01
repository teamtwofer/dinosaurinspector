import { Component } from '@nestjs/common';
import { autobind } from 'core-decorators';
import { Repository } from 'typeorm';
import { ForgotPassword } from '../../entities/forgot-password.entity';
import { User } from '../../entities/user.entity';
import { DatabaseService } from '../database/database.service';

@Component()
export class ForgotPasswordService {
  constructor(public databaseService: DatabaseService) {}

  private get repository(): Promise<Repository<ForgotPassword>> {
    return this.databaseService.getRepository(ForgotPassword);
  }

  @autobind
  async add(user: User): Promise<ForgotPassword> {
    const forgotPassword = new ForgotPassword();
    forgotPassword.user = user;
    return (await this.repository).persist(forgotPassword);
  }

  @autobind
  async get(id: string) {
    return (await this.repository)
      .createQueryBuilder('fp')
      .innerJoinAndSelect('fp.user', 'user')
      .where('fp.id=:id')
      .setParameter('id', id)
      .getOne();
  }

  @autobind
  async delete(id: string) {
    return (await this.repository).removeById(id);
  }
}
