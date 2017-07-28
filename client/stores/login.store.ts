// import { types } from 'mobx-state-tree';
import { FieldState, FormState } from 'formstate';
import { action, computed, observable } from 'mobx';
import { lang } from '../../lang/index';
import { FlashMessageType } from '../../types/flash-messages';
import { IForm } from '../../types/form';
import { IRegisterUser } from '../../types/user';
import { flashMessageStore } from './flash-message.store';
import { required } from './validators';

export class LoginStore
  implements IForm<{ user: Pick<IRegisterUser, 'email' | 'password'> }> {
  @observable isLoading = false;
  @observable isSuccess = false;
  @observable error: string;
  @observable email = new FieldState('').validators(required('email'));

  @observable password = new FieldState('').validators(required('password'));

  @observable
  form = new FormState({ email: this.email, password: this.password });

  @computed
  get value() {
    const { email: { $: email }, password: { $: password } } = this;
    return { user: { email, password } };
  }

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
  }

  @action.bound
  load() {
    this.isLoading = true;
    this.isSuccess = false;
    flashMessageStore.addMessages({
      type: FlashMessageType.Success,
      content: lang.FLASH_LOGIN(),
    });
  }

  @action.bound
  async loginUser(): Promise<string | void> {
    const errors = await this.form.validate();
    this.load();
    if (errors.hasError) {
      this.updateError('');
      return;
    }
    try {
      const tokenOrError = await fetch('/api/user/token', {
        body: JSON.stringify(this.value),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }).then(r => r.json());

      if (tokenOrError.message) {
        this.updateError(tokenOrError.message);
        return;
      }

      this.succeed();

      return tokenOrError.token;
    } catch (e) {
      this.updateError(e.message);
    }
    return;
  }
}
