import { CreateAccountStore } from './create-account.store';
import { LoginStore } from './login.store';
import { UserStore } from './user.store';

export interface Stores {
  createAccountStore: CreateAccountStore;
  loginStore: LoginStore;
  userStore: UserStore;
}
