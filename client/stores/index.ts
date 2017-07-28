import { CreateAccountStore } from './create-account.store';
import { FlashMessageStore } from './flash-message.store';
import { ForgotPasswordStore } from './forgot-password.store';
import { LoginStore } from './login.store';
import { RecoverPasswordStore } from './recover-password.store';
import { UserStore } from './user.store';

export interface Stores {
  createAccountStore: CreateAccountStore;
  loginStore: LoginStore;
  userStore: UserStore;
  forgotPasswordStore: ForgotPasswordStore;
  recoverPasswordStore: RecoverPasswordStore;
  flashMessageStore: FlashMessageStore;
}
