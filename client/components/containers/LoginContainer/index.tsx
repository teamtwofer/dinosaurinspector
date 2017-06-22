import { autobind } from 'core-decorators';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { LoginStore } from '../../../stores/login.store';
import { UserStore } from '../../../stores/user.store';
import { Input } from '../../ui/Input';

@inject('loginStore', 'userStore')
@observer
export class LoginContainer extends React.PureComponent<Props, never> {
  @autobind
  async login() {
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
      <div>
        User needs to log in
        <Input field={email} name="email" type="email" />
        <Input field={password} name="password" type="password" />
        {error && <p>{error}</p>}
        <button onClick={this.login}>Login</button>
      </div>
    );
  }
}

export interface Props extends RouteComponentProps<void> {
  loginStore?: LoginStore;
  userStore?: UserStore;
}
