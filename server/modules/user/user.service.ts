import { Component } from '@nestjs/common';
import { autobind } from 'core-decorators';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import bcrypt = require('bcrypt');
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
  async forgotPassword(user: IForgotUser) {
    if (user && user.email) {
      const realUser = await (await this.repository).findOne({
        email: user.email,
      });
      if (realUser) {
        const forgotPassword = await this.forgotPasswordService.add(realUser);
        this.emailService.sendMail(
          realUser,
          '0512eeea-c584-4943-bc1e-13935effeb32',
          {
            '-name-': realUser.name,
            '-url-':
              'https://twofer.co/acount/recover-password/' + forgotPassword.id,
          }
        );
        return; // send email
      } else {
        // log that this happened?
        return; // maybe send email to account with message
        // hey someone is trying to access your account here
        // even though you don't have one. With us.
      }
    }
  }

  @autobind
  async generateToken({ email, password }: ILoginUser): Promise<string> {
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
