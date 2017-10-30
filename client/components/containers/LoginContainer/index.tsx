import { autobind } from 'core-decorators';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Stores } from '../../../stores';
import { LoginStore } from '../../../stores/login.store';
import { UserStore } from '../../../stores/user.store';
import { AccountHeading } from '../../ui/AccountHeading';
import { Button } from '../../ui/Button';
import { CallToAction } from '../../ui/CallToAction';
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
    const { match } = this.props;
    const { email, password, error, isLoading } = this.props.loginStore!;
    return (
      <form onSubmit={this.login}>
        <AccountHeading match={match} />
        <Input field={email} name="email" type="email" />
        <Input field={password} name="password" type="password" />
        {error && <p>{error}</p>}
        <Button isLoading={isLoading} type="submit" onClick={this.login}>
          Login
        </Button>
        <CallToAction match={match} />
      </form>
    );
  }
}

export interface Props extends RouteComponentProps<void> {
  loginStore: LoginStore;
  userStore: UserStore;
}
