import { Component } from '@nestjs/common';
import bcrypt = require('bcrypt');
import { autobind } from 'core-decorators';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import parser = require('ua-parser-js');
import { lang } from '../../../lang';
import { ICrud } from '../../../types/crud';
import { IForgotUser, ILoginUser, IRegisterUser } from '../../../types/user';
import { User } from '../../entities/user.entity';
import key from '../../entities/user.key';
import { DatabaseService } from '../database/database.service';
import { EmailService } from '../email/email.service';
import { ForgotPasswordService } from '../forgot-password/forgot-password.service';

@Component()
export class UserService implements ICrud<User, IRegisterUser> {
  constructor(
    public databaseService: DatabaseService,
    public forgotPasswordService: ForgotPasswordService,
    public emailService: EmailService
  ) {
    if (process.env.NODE_ENV === 'development') {
      // this.seed();
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
    return (await this.repository).save(user);
  }

  @autobind
  async addAll(...users: User[]) {
    return (await this.repository).save(users);
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
    return (await this.repository).save(user);
  }

  @autobind
  async remove(user: User) {
    return (await this.repository).remove(user);
  }

  @autobind
  async forgotPassword(user: IForgotUser, req: any) {
    const realUser = await (await this.repository).findOne({
      email: user.email,
    });
    if (realUser) {
      const forgotPassword = await this.forgotPasswordService.add(realUser);
      this.emailService.sendForgotPasswordEmail(
        realUser,
        forgotPassword,
        (parser as any)(req.headers['user-agent'])
      );
      return; // send email
    } else {
      // log that this happened?
      return; // maybe send email to account with message
      // hey someone is trying to access your account here
      // even though you don't have one. With us.
    }
  }

  @autobind
  async generateToken({ email, password }: ILoginUser): Promise<string> {
    const user = await (await this.repository).findOne({ email });
    if (!user) {
      throw new Error(lang.INVALID_EMAIL_OR_PASSWORD());
    }

    try {
      const validPassword = await bcrypt.compare(password, user.hashedPassword);
      if (!validPassword) {
        throw new Error(lang.INVALID_EMAIL_OR_PASSWORD());
      }
    } catch (_e) {
      throw new Error(lang.INVALID_EMAIL_OR_PASSWORD());
    }

    const { id } = user;
    return jwt.sign(`${id}`, key, {
      expiresIn: '14d',
    });
  }

  @autobind
  async validateToken(token: string): Promise<number> {
    return await new Promise<number>((res, rej) => {
      jwt.verify(token, key, (err, decoded) => {
        if (err) {
          rej(err);
        }
        res(parseInt(decoded as string, 10));
      });
    });
  }
}
