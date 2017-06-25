import { action, computed, observable } from 'mobx';

import { IUser } from '../../types/user';
import { cook, dateCooker } from '../cook';
import { storage } from '../storage';

export class User implements IUser {
  static cook(rawUser: any): User {
    const tempUser = new User();
    cook('User', tempUser, rawUser, ['email', 'name', 'id', 'createdAt'], {
      createdAt: dateCooker,
      updatedAt: dateCooker,
    });
    return tempUser;
  }

  @observable email: string;
  @observable id: number;
  @observable name: string;
  @observable createdAt: Date;
  @observable updatedAt: Date | null;
}

const TOKEN = 'token';

// tslint:disable-next-line:max-classes-per-file
export class UserStore {
  @observable isLoading = false;

  @observable user: User | null = null;

  constructor() {
    const token = storage.getItem(TOKEN);
    if (token !== null) {
      this.loadUser(token);
    }
  }

  @computed
  get currentUser(): User | null {
    return !this.isLoading && this.user ? this.user : null;
  }

  @action.bound
  async loadUser(token: string) {
    this.isLoading = true;
    const rawUser = await fetch('/api/user', {
      headers: {
        'x-access-token': token,
      },
    }).then(r => r.json());
    this.updateUser(rawUser, token);
  }

  @action.bound
  updateUser(rawUser: any, token: string) {
    this.user = User.cook(rawUser);
    this.isLoading = false;
    storage.setItem(TOKEN, token);
  }
}
