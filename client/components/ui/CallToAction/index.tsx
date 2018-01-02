import * as React from 'react';
import { match as RRmatch } from 'react-router';
import { Link } from 'react-router-dom';

import { lang } from '../../../../lang';
import { createAccount, forgotPassword, login } from '../../../urls';
import {
  isCreatingAccount,
  isLogin,
  isRememberingPassword,
} from '../../../utils/account';
import { Button } from '../Button';

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

function AccountInnerLink(props: any) {
  return <Link {...props} to={createAccount()} />;
}

function AccountLink() {
  return (
    <p>
      {lang.NO_ACCOUNT()}{' '}
      <Button
        raised={false}
        color="default"
        removeMargin
        component={AccountInnerLink}
      >
        {lang.CREATE_ONE()}
      </Button>
    </p>
  );
}

function LoginInnerLink(props: any) {
  return <Link {...props} to={login()} />;
}

function LoginLink() {
  return (
    <p>
      {lang.ACCOUNT_EXISTS()}
      <Button
        raised={false}
        color="default"
        removeMargin
        component={LoginInnerLink}
      >
        {lang.LOGIN_INSTEAD()}
      </Button>
    </p>
  );
}

function ForgotPasswordInner(props: any) {
  return <Link {...props} to={forgotPassword()} />;
}

function ForgotPassword() {
  return (
    <p>
      {lang.CANT_REMEMBER()}
      <Button
        raised={false}
        color="default"
        removeMargin
        component={ForgotPasswordInner}
      >
        {lang.GET_A_NEW_ONE()}
      </Button>
    </p>
  );
}

export interface Props {
  match: RRmatch<any>;
}
