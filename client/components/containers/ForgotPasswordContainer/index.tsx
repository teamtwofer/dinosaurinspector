import { autobind } from 'core-decorators';
import { inject } from 'mobx-react';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { lang } from '../../../../lang';
import { Stores } from '../../../stores';
import { ForgotPasswordStore } from '../../../stores/forgot-password.store';
import { AccountHeading } from '../../ui/AccountHeading';
import { CallToAction } from '../../ui/CallToAction';
import { Input } from '../../ui/Input';

@inject(({ forgotPasswordStore }: Stores) => ({ forgotPasswordStore }))
export class ForgotPasswordContainer extends React.PureComponent<Props, any> {
  @autobind
  async createAccount(
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();

    const { tryToGetNewPassword } = this.props.forgotPasswordStore;

    await tryToGetNewPassword();
  }

  render() {
    const { match, forgotPasswordStore: { email } } = this.props;
    return (
      <div>
        <AccountHeading match={match} />
        {lang.EXPLAIN_FORGOT_PASSWORD()}
        <Input field={email} name="email" type="email" />
        <button type="submit" onClick={this.createAccount}>
          {lang.SEND_RECOVERY_EMAIL()}
        </button>
        <CallToAction match={match} />
      </div>
    );
  }
}

export interface Props extends RouteComponentProps<void> {
  forgotPasswordStore: ForgotPasswordStore;
}
