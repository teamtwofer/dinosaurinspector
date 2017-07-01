import * as React from 'react';
import { match } from 'react-router';
import { Link } from 'react-router-dom';

import { lang } from '../../../../lang';
import { createAccount, forgotPassword, login } from '../../../urls';
import {
  isCreatingAccount,
  isLogin,
  isRememberingPassword,
} from '../../../utils/account';

export class CallToAction extends React.PureComponent<
  Pick<Props, 'match'>,
  never
> {
  render() {
    const { match } = this.props;

    return (
      <div>
        {!isLogin(match) && <LoginLink />}
        {!isCreatingAccount(match) && <AccountLink />}
        {!isRememberingPassword(match) && <ForgotPassword />}
      </div>
    );
  }
}

function AccountLink() {
  return (
    <p>
      {lang.NO_ACCOUNT()} <Link to={createAccount()}>{lang.CREATE_ONE()}</Link>
    </p>
  );
}

function LoginLink() {
  return (
    <p>
      {lang.ACCOUNT_EXISTS()} <Link to={login()}>{lang.LOGIN_INSTEAD()}</Link>
    </p>
  );
}

function ForgotPassword() {
  return (
    <p>
      {lang.CANT_REMEMBER()}{' '}
      <Link to={forgotPassword()}>{lang.GET_A_NEW_ONE()}</Link>
    </p>
  );
}

export interface Props {
  match: match<any>;
}
