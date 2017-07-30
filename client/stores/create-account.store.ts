import { FieldState, FormState } from 'formstate';
import { action, computed, observable } from 'mobx';
import { Service } from 'typedi/decorators/Service';
import { lang } from '../../lang/index';
import { FlashMessageType } from '../../types/flash-messages';
import { IForm } from '../../types/form';
import { IRegisterUser, IUser } from '../../types/user';
import { FlashMessageStore } from './flash-message.store';
import { UserStore } from './user.store';
import {
  email as emailValidator,
  matchValue,
  minLength,
  required,
} from './validators';

@Service()
export class CreateAccountStore implements IForm<{ user: IRegisterUser }> {
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
    email: this.email,
    name: this.name,
    password: this.password,
  });

  constructor(
    private userStore: UserStore,
    private flashMessageStore: FlashMessageStore
  ) {}

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
      content: lang.FLASH_CREATE_ACCOUNT(),
    });
  }

  @action.bound
  load() {
    this.isLoading = true;
    this.isSuccess = false;
  }

  @action.bound
  async create(): Promise<{ user: IUser; token: string } | void> {
    const errors = await this.form.validate();
    this.load();
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
        return;
      }

      this.succeed();

      if (userAndTokenOrError) {
        const { token, user } = userAndTokenOrError;
        this.userStore.updateUser(user, token);
      }
      return userAndTokenOrError;
    } catch (e) {
      this.updateError(e.message);
    }
  }

  @computed
  get value() {
    const {
      email: { $: email },
      password: { $: password },
      name: { $: name },
    } = this;
    return { user: { email, password, name } };
  }
}
