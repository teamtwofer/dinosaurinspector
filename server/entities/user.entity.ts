import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import bcrypt = require('bcrypt');

import { IRegisterUser, IUser } from '../../types/user';

const SALT_ROUNDS = 12;

@Entity()
export class User implements IUser {
  static async from(registerUser: IRegisterUser): Promise<User> {
    const user = new User(registerUser.name, registerUser.email);
    await user.setHashedPassword(registerUser.password);

    // remove the password from memory
    (registerUser as any).password = null;

    return user;
  }

  @PrimaryGeneratedColumn() id: number;

  @Column() email: string;

  @Column() name: string;

  @Column('text') hashedPassword: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  async setHashedPassword(password: string): Promise<this> {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    this.hashedPassword = hash;
    return this;
  }
}
