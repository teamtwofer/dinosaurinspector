import { autobind } from 'core-decorators';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Stores } from '../../../stores';
import { LoginStore } from '../../../stores/login.store';
import { UserStore } from '../../../stores/user.store';
import { createAccount } from '../../../urls';
import { Input } from '../../ui/Input';

@inject(({ loginStore, userStore }: Stores) => ({ loginStore, userStore }))
@observer
export class LoginContainer extends React.PureComponent<Props, never> {
  @autobind
  async login(
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();
    const { loginUser } = this.props.loginStore!;
    const { loadUser } = this.props.userStore!;

    const token = await loginUser();
    if (token) {
      loadUser(token);
    }
  }
  render() {
    const { email, password, error } = this.props.loginStore!;
    return (
      <form onSubmit={this.login}>
        User needs to log in
        <Input field={email} name="email" type="email" />
        <Input field={password} name="password" type="password" />
        {error && <p>{error}</p>}
        <button type="submit" onClick={this.login}>Login</button>
        <p>
          Don't have an account? <Link to={createAccount()}>Create one.</Link>
        </p>
      </form>
    );
  }
}

export interface Props extends RouteComponentProps<void> {
  loginStore?: LoginStore;
  userStore?: UserStore;
}
