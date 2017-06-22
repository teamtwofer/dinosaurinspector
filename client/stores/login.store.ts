// import { types } from 'mobx-state-tree';
import { FieldState, FormState } from 'formstate';
import { action, computed, observable } from 'mobx';

import { lang } from '../../lang';

export function requiredValidator(fieldName) {
  return val => !val && lang.REQUIRED_VALIDATOR(fieldName);
}

export class LoginStore {
  @observable email = new FieldState('').validators(requiredValidator('email'));

  @observable
  password = new FieldState('').validators(requiredValidator('password'));

  @observable
  form = new FormState({ email: this.email, password: this.password });

  @observable error: string;

  @observable isLoading = false;

  @computed
  get value() {
    const { email: { $: email }, password: { $: password } } = this;
    return { user: { email, password } };
  }

  @action.bound
  updateError(error: string) {
    this.error = error;
  }

  @action.bound
  async loginUser(): Promise<string | void> {
    const errors = await this.form.validate();
    if (errors.hasError) {
      this.updateError(this.form.error!);
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
      }

      return tokenOrError.token;
    } catch (e) {
      this.updateError(e.message);
    }
    return;
  }
}
