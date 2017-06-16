import { Component } from '@nestjs/common';
import { autobind } from 'core-decorators';
import { Repository } from 'typeorm';

import { ICrud } from '../../../types/crud';
import { IRegisterUser } from '../../../types/user';
import { User } from '../../entities/user.entity';
import { DatabaseService } from '../database/database.service';

@Component()
export class UserService implements ICrud<User, IRegisterUser> {
  constructor(public databaseService: DatabaseService) {
    if (process.env.NODE_ENV === 'development') {
      this.seed();
    }
  }

  private get repository(): Promise<Repository<User>> {
    return this.databaseService.getRepository(User);
  }

  async seed() {
    const repo = await this.repository;
    const count = await repo.count();
    if (count === 0) {
      const ben: IRegisterUser = {
        email: 'ben@twofer.co',
        name: 'Ben',
        password: 'password',
      };
      const users = await this.add(ben);

      return users;
    }

    return repo.find();
  }

  @autobind
  async add(userToRegister: IRegisterUser) {
    const user = await User.from(userToRegister);
    return (await this.repository).persist(user);
  }

  @autobind
  async addAll(...users: User[]) {
    return (await this.repository).persist(users);
  }

  @autobind
  async getAll() {
    return (await this.repository).find();
  }

  @autobind
  async get(id: number) {
    return (await this.repository).findOneById(id);
  }

  @autobind
  async update(user: User) {
    return (await this.repository).persist(user);
  }

  @autobind
  async remove(user: User) {
    return (await this.repository).remove(user);
  }
}
