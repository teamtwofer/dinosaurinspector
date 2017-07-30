import { autobind } from 'core-decorators';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Stores } from '../../../stores';
import { CreateAccountStore } from '../../../stores/create-account.store';
import { UserStore } from '../../../stores/user.store';
import { AccountHeading } from '../../ui/AccountHeading';
import { Button } from '../../ui/Button/index';
import { CallToAction } from '../../ui/CallToAction';
import { ErrorMessage } from '../../ui/ErrorMessage/index';
import { Input } from '../../ui/Input';

@inject(({ createAccountStore, userStore }: Stores) => ({
  createAccountStore,
  userStore,
}))
@observer
export class CreateAccountContainer extends React.PureComponent<Props, {}> {
  @autobind
  async createAccount(
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();

    const { createAccountStore: { create } } = this.props;

    create();
  }
  render() {
    const { match } = this.props;
    const { email, password, name, confirmPassword, error, isLoading } = this
      .props.createAccountStore!;
    return (
      <form onSubmit={this.createAccount}>
        <AccountHeading match={match} />
        <Input field={email} name="email" type="email" />
        <Input field={name} name="name" autoCorrect={'false'} />
        <Input field={password} name="password" type="password" />
        <Input
          field={confirmPassword}
          name="confirm password"
          type="password"
        />
        <ErrorMessage error={error} />
        <Button type="submit" onClick={this.createAccount} disabled={isLoading}>
          Login
        </Button>
        <CallToAction match={match} />
      </form>
    );
  }
}

export interface Props extends RouteComponentProps<void> {
  createAccountStore: CreateAccountStore;
  userStore: UserStore;
}
