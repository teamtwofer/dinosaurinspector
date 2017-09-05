import { autobind } from 'core-decorators';
import Typography from 'material-ui/Typography/Typography';
import { inject } from 'mobx-react';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { lang } from '../../../../lang';
import { Stores } from '../../../stores';
import { ForgotPasswordStore } from '../../../stores/forgot-password.store';
import { AccountHeading } from '../../ui/AccountHeading';
import { Button } from '../../ui/Button';
import { CallToAction } from '../../ui/CallToAction';
import { Input } from '../../ui/Input';

const style = require('./style.scss');

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
    const { match, forgotPasswordStore: { email, isLoading } } = this.props;
    return (
      <form onSubmit={this.createAccount}>
        <AccountHeading match={match} />
        <Typography className={style.helperText}>
          {lang.EXPLAIN_FORGOT_PASSWORD()}
        </Typography>
        <Input field={email} name="email" type="email" />
        <Button isLoading={isLoading} type="submit" disabled={isLoading}>
          {lang.SEND_RECOVERY_EMAIL()}
        </Button>
        <CallToAction match={match} />
      </form>
    );
  }
}

export interface Props extends RouteComponentProps<void> {
  forgotPasswordStore: ForgotPasswordStore;
}
