import { FieldState, FormState } from 'formstate';
import { action, computed, observable } from 'mobx';
import { lang } from '../../lang/index';
import { FlashMessageType } from '../../types/flash-messages';
import { IForm } from '../../types/form';
import { IRegisterUser, IUser } from '../../types/user';
import { patch } from '../utils/api';
import { flashMessageStore } from './flash-message.store';
import { matchValue, minLength, required } from './validators';

export class RecoverPasswordStore
  implements IForm<{ user: Pick<IRegisterUser, 'password'> }> {
  @observable isLoading = false;
  @observable isSuccess = false;
  @observable error: string;

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

  @observable
  form = new FormState({
    confirmPassword: this.confirmPassword,
    password: this.password,
  });

  @action.bound
  updateError(message: string) {
    this.isLoading = false;
    this.isSuccess = false;
    this.error = message;
  }

  @action.bound
  succeed() {
    this.isLoading = false;
    this.isSuccess = true;
    flashMessageStore.addMessages({
      type: FlashMessageType.Success,
      content: lang.FLASH_NEW_PASSWORD(),
    });
  }

  @action.bound
  load() {
    this.isLoading = true;
    this.isSuccess = false;
  }

  @action.bound
  async create(id: string): Promise<{ user: IUser; token: string } | void> {
    this.load();
    const errors = await this.form.validate();
    if (errors.hasError) {
      this.updateError('');
      return;
    }

    try {
      const userOrError = await patch(
        `/api/user/recover-password/${id}`,
        this.value
      );

      if (userOrError.message) {
        this.updateError(userOrError.message);
        return;
      }

      this.succeed();

      return userOrError;
    } catch (e) {
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
