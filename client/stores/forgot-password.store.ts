import { FieldState, FormState } from 'formstate';
import { action, computed, observable } from 'mobx';
import { Service } from 'typedi/decorators/Service';
import { lang } from '../../lang/index';
import { FlashMessageType } from '../../types/flash-messages';
import { IForm } from '../../types/form';
import { IForgotUser, IUser } from '../../types/user';
import { post } from '../utils/api';
import { FlashMessageStore } from './flash-message.store';
import { email as emailValidator, minLength, required } from './validators';

@Service()
export class ForgotPasswordStore implements IForm<{ user: IForgotUser }> {
  @observable isLoading = false;
  @observable isSuccess = false;
  @observable error: string;

  @observable
  name = new FieldState('').validators(required('name'), minLength('name', 4));

  @observable
  email = new FieldState('').validators(
    required('email'),
    minLength('email', 5),
    emailValidator('email')
  );

  @observable
  form = new FormState({
    email: this.email,
  });

  constructor(private flashMessageStore: FlashMessageStore) {}

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
    this.flashMessageStore.addMessages({
      type: FlashMessageType.Success,
      content: lang.FLASH_FORGOT_PASSWORD(),
    });
  }

  @action.bound
  load() {
    this.isLoading = true;
    this.isSuccess = false;
  }

  @action.bound
  async tryToGetNewPassword(): Promise<{ user: IUser; token: string } | void> {
    const errors = await this.form.validate();
    this.load();
    if (errors.hasError) {
      this.updateError('');
      return;
    }

    try {
      const errorOrNull = await post('/api/user/forgot-password', this.value);
      if (errorOrNull.message) {
        this.updateError(errorOrNull.message);
        return;
      }

      this.succeed();

      return errorOrNull;
    } catch (e) {
      this.updateError(e);
    }
  }

  @computed
  get value() {
    const { email: { $: email } } = this;
    return { user: { email } };
  }
}
