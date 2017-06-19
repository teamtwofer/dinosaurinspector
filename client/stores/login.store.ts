import { types } from 'mobx-state-tree';
import { lang } from '../../lang';

export function requiredValidator(fieldName) {
  return val => !val && `${fieldName} is required`;
}

// tslint:disable-next-line:variable-name
export const LoginStore = types.model(
  'LoginStore',
  {
    email: '',
    error: '',
    isLoading: false,
    password: '',
  },
  {
    updateEmail(e: React.ChangeEvent<HTMLInputElement>) {
      this.error = '';
      this.email = e.target.value;
    },

    updatePassword(e: React.ChangeEvent<HTMLInputElement>) {
      this.error = '';
      this.password = e.target.value;
    },

    updateError(error: string) {
      this.error = error;
    },

    async loginUser(): Promise<string | void> {
      if (!this.email || !this.password) {
        this.error = lang.EMAIL_AND_PASSWORD_ARE_REQUIRED();
        return;
      }
      try {
        const { email, password } = this;
        const tokenOrError = await fetch('/api/user/token', {
          body: JSON.stringify({ user: { email, password } }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        }).then(r => r.json());

        if (tokenOrError.message) {
          this.updateError(tokenOrError.message);
        }

        return tokenOrError.token;
      } catch (e) {
        this.updateError(e.message);
      }
      return;
    },
  }
);

export type LoginStore = typeof LoginStore.Type;
