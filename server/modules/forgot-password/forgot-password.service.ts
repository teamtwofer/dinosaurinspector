import { Component } from '@nestjs/common';
import { autobind } from 'core-decorators';
import { Repository } from 'typeorm';
import { ForgotPassword } from '../../entities/forgot-password.entity';
import { DatabaseService } from '../database/database.service';

@Component()
export class ForgotPasswordService {
  constructor(public databaseService: DatabaseService) {}

  private get repository(): Promise<Repository<ForgotPassword>> {
    return this.databaseService.getRepository(ForgotPassword);
  }

  @autobind
  async add(): Promise<ForgotPassword> {
    const forgotPassword = new ForgotPassword();
    return (await this.repository).persist(forgotPassword);
  }
}
