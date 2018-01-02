import bcrypt = require('bcrypt');
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { IRegisterUser, IUser } from '../../types/user';
import { Base } from './base.entity';
import { ForgotPassword } from './forgot-password.entity';
import { Measurement } from './measurement.entity';

const SALT_ROUNDS = process.env.NODE_ENV === 'test' ? 1 : 12;

@Entity()
export class User extends Base implements IUser {
  static async from(registerUser: IRegisterUser): Promise<User> {
    const user = new User(registerUser.name, registerUser.email);
    await user.setHashedPassword(registerUser.password);

    // remove the password from memory
    (registerUser as any).password = null;

    return user;
  }

  @Column()
  @Index({ unique: true })
  email: string;

  @Column() name: string;

  @Column('text') hashedPassword: string;

  @OneToMany(_type => ForgotPassword, fp => fp.user)
  forgotPasswords: ForgotPassword[];

  @OneToMany(_type => Measurement, m => m.user)
  measurements: Measurement[];

  constructor(name: string, email: string) {
    super();
    this.name = name;
    this.email = email;
  }

  async setHashedPassword(password: string): Promise<this> {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    this.hashedPassword = hash;
    return this;
  }
}
