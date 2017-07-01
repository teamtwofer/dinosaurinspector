import { FieldState, FormState } from 'formstate';
import { action, computed, observable } from 'mobx';
import { IForm } from '../../types/form';
import { IRegisterUser, IUser } from '../../types/user';
import { patch } from '../utils/api';
import { matchValue, minLength, required } from './validators';

export class RecoverPasswordStore
  implements IForm<{ user: Pick<IRegisterUser, 'password'> }> {
  @observable isLoading = false;

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
  stopLoading() {
    this.isLoading = false;
  }

  @action.bound
  startLoading() {
    this.isLoading = true;
  }

  @action.bound
  async create(id: string): Promise<{ user: IUser; token: string } | void> {
    this.startLoading();
    const errors = await this.form.validate();
    if (errors.hasError) {
      this.stopLoading();
      return;
    }

    try {
      const userOrError = await patch(
        `/api/user/recover-password/${id}`,
        this.value
      );

      this.stopLoading();

      if (userOrError.message) {
        this.updateError(userOrError.message);
        return;
      }

      return userOrError;
    } catch (e) {
      this.stopLoading();
      this.updateError(e);
      return;
    }
  }

  @computed
  get value() {
    const { password: { $: password } } = this;
    return { user: { password } };
  }
}
