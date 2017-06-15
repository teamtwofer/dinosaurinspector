import { Component } from '@nestjs/common';
import { IUser } from '../../../types/user';
import { User } from '../../entities/user.entity';

@Component()
export class UserSerializer {
  serializeFull({ email, id, name }: User): IUser {
    return { email, id, name };
  }
}
