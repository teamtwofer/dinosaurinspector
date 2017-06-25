import { Component } from '@nestjs/common';
import { IUser } from '../../../types/user';
import { User } from '../../entities/user.entity';

@Component()
export class UserSerializer {
  serializeFull({ email, id, name, createdAt, updatedAt }: User): IUser {
    return { email, id, name, createdAt, updatedAt: updatedAt || null };
  }

  serializeTokenAndUser(user: User, token: string) {
    return { token, user: this.serializeFull(user) };
  }
}
