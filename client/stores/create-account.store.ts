import { FieldState } from 'formstate';
import { computed, observable } from 'mobx';
import { IRegisterUser } from '../../types/user';
import { email, minLength, required } from './validators';

export class CreateAccountStore {
  @observable
  name = new FieldState('').validators(required('name'), minLength('name', 4));

  @observable
  email = new FieldState('').validators(
    required('email'),
    minLength('email', 5),
    email('email')
  );

  @observable
  password = new FieldState('').validators(
    required('password'),
    minLength('password', 8)
  );

  @computed
  get value(): { user: IRegisterUser } {
    const {
      email: { $: email },
      password: { $: password },
      name: { $: name },
    } = this;
    return { user: { email, password, name } };
  }
}
