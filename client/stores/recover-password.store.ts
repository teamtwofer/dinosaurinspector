import { FieldState, FormState } from 'formstate';
import { action, computed, observable } from 'mobx';
import { IForm } from '../../types/form';
import { IRegisterUser, IUser } from '../../types/user';
import { matchValue, minLength, required } from './validators';

export class RecoverPasswordStore
  implements IForm<{ user: Pick<IRegisterUser, 'password'> }> {
  @observable
  password = new FieldState('').validators(
    required('password'),
    minLength('password', 8)
  );

  @observable
  confirmPassword = new FieldState('').validators(
    required('confirm password'),
    matchValue('password', () => this.password)
  );

  @observable error: string;

  @observable
  form = new FormState({
    confirmPassword: this.confirmPassword,
    password: this.password,
  });

  @action.bound
  updateError(message: string) {
    this.error = message;
  }

  @action.bound
  async create(): Promise<{ user: IUser; token: string } | void> {
    const errors = await this.form.validate();
    if (errors.hasError) {
      return;
    }

    try {
      const userAndTokenOrError = await fetch('/api/user', {
        body: JSON.stringify(this.value),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }).then(r => r.json());

      if (userAndTokenOrError.message) {
        this.updateError(userAndTokenOrError.message);
      }

      return userAndTokenOrError;
    } catch (e) {
      this.updateError(e);
    }
  }

  @computed
  get value() {
    const { password: { $: password } } = this;
    return { user: { password } };
  }
}
