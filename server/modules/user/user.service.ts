import { Component } from '@nestjs/common';
import { autobind } from 'core-decorators';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import bcrypt = require('bcrypt');

import { lang } from '../../../lang';
import { ICrud } from '../../../types/crud';
import { IRegisterUser } from '../../../types/user';
import { User } from '../../entities/user.entity';
import key from '../../entities/user.key';
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

  @autobind
  async generateToken({
    email,
    password,
  }: Partial<IRegisterUser>): Promise<string> {
    const user = await (await this.repository).findOne({ email });
    if (!user) {
      throw new Error(lang.INVALID_EMAIL_OR_PASSWORD());
    }

    const validPassword = await bcrypt.compare(password, user.hashedPassword);

    if (!validPassword) {
      throw new Error(lang.INVALID_EMAIL_OR_PASSWORD());
    }

    const { id } = user;

    return jwt.sign({ id } as object, key, {
      expiresIn: 60 * 60 * 24 * 14,
    });
  }

  @autobind
  async validateToken(token: string): Promise<number> {
    return await new Promise<number>((res, rej) => {
      jwt.verify(token, key, (err, decoded: { id: number }) => {
        if (err) {
          return rej(err);
        }
        return res(decoded.id);
      });
    });
  }
}
