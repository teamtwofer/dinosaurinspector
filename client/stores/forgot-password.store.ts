import { FieldState, FormState } from 'formstate';
import { action, computed, observable } from 'mobx';
import { IForgotUser, IUser } from '../../types/user';
import { post } from '../utils/api';
import { email, minLength, required } from './validators';
export class ForgotPasswordStore {
  @observable
  name = new FieldState('').validators(required('name'), minLength('name', 4));

  @observable
  email = new FieldState('').validators(
    required('email'),
    minLength('email', 5),
    email('email')
  );

  @observable error: string;

  @observable
  form = new FormState({
    email: this.email,
  });

  @action.bound
  updateError(message: string) {
    this.error = message;
  }

  @action.bound
  async tryToGetNewPassword(): Promise<{ user: IUser; token: string } | void> {
    const errors = await this.form.validate();
    if (errors.hasError) {
      return;
    }

    try {
      const errorOrNull = await post('/api/user/forgot-password', this.value);

      if (errorOrNull.message) {
        this.updateError(errorOrNull.message);
      }

      return errorOrNull;
    } catch (e) {
      this.updateError(e);
    }
  }

  @computed
  get value(): { user: IForgotUser } {
    const { email: { $: email } } = this;
    return { user: { email } };
  }
}
