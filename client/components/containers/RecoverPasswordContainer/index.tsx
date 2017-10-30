import { autobind } from 'core-decorators';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Stores } from '../../../stores';
import { RecoverPasswordStore } from '../../../stores/recover-password.store';
import { AccountHeading } from '../../ui/AccountHeading';
import { Button } from '../../ui/Button';
import { CallToAction } from '../../ui/CallToAction';
import { Input } from '../../ui/Input';

@inject(({ recoverPasswordStore }: Stores) => ({ recoverPasswordStore }))
@observer
export class RecoverPasswordContainer extends React.PureComponent<Props, {}> {
  @autobind
  async createAccount(
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();
    const {
      recoverPasswordStore: { create },
      match: { params: { id } },
    } = this.props;

    await create(id);
  }

  render() {
    const { match } = this.props;
    const {
      password,
      confirmPassword,
      error,
      isLoading,
    } = this.props.recoverPasswordStore;
    return (
      <form onSubmit={this.createAccount}>
        <AccountHeading match={match} />
        <Input field={password} name="password" type="password" />
        <Input
          field={confirmPassword}
          name="confirm password"
          type="password"
        />
        {error && <p>{error}</p>}
        <Button
          type="submit"
          isLoading={isLoading}
          disabled={isLoading}
          onClick={this.createAccount}
        >
          Login
        </Button>
        <CallToAction match={match} />
      </form>
    );
  }
}

export interface Props extends RouteComponentProps<{ id: string }> {
  recoverPasswordStore: RecoverPasswordStore;
}
