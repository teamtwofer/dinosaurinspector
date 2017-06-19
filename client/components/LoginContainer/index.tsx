import { autobind } from 'core-decorators';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

import { LoginStore } from '../../stores/login.store';
import { UserStore } from '../../stores/user.store';

@inject('loginStore', 'userStore')
@observer
export class LoginContainer extends React.PureComponent<
  {
    loginStore?: LoginStore;
    userStore?: UserStore;
  },
  {}
> {
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
    const { email, password, updateEmail, updatePassword, error } = this.props
      .loginStore!;
    return (
      <div>
        User needs to log in
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={updateEmail}
            value={email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={updatePassword}
            value={password}
          />
        </div>
        {error && <p>{error}</p>}
        <button onClick={this.login}>Login</button>
      </div>
    );
  }
}
