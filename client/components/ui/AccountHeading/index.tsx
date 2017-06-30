import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { lang } from '../../../../lang';
import {
  isCreatingAccount,
  isLogin,
  isRememberingPassword,
} from '../../../utils/account';

export class AccountHeading extends React.PureComponent<any, any> {
  render() {
    const { match } = this.props;
    return (
      <h1>
        {isLogin(match) && lang.LOGIN()}
        {isCreatingAccount(match) && lang.CREATE_ACCOUNT()}
        {isRememberingPassword(match) && lang.FORGOT_PASSWORD()}
      </h1>
    );
  }
}

export interface Props extends RouteComponentProps<void> {}
