import { autobind } from 'core-decorators';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Stores } from '../../../stores';
import { CreateAccountStore } from '../../../stores/create-account.store';
import { AccountHeading } from '../../ui/AccountHeading';
import { CallToAction } from '../../ui/CallToAction';
import { Input } from '../../ui/Input';

@inject(({ createAccountStore }: Stores) => ({ createAccountStore }))
@observer
export class CreateAccountContainer extends React.PureComponent<Props, {}> {
  @autobind
  async createAccount(
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();

    const { create } = this.props.createAccountStore;

    await create();
  }
  render() {
    const { match } = this.props;
    const { email, password, name, confirmPassword, error } = this.props
      .createAccountStore!;
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
        {error && <p>{error}</p>}
        <button type="submit" onClick={this.createAccount}>Login</button>
        <CallToAction match={match} />
      </form>
    );
  }
}

export interface Props extends RouteComponentProps<void> {
  createAccountStore: CreateAccountStore;
}