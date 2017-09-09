import { observer } from 'mobx-react';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { lang } from '../../../../lang';
import {
  isCreatingAccount,
  isLogin,
  isRecoveringPassword,
  isRememberingPassword,
} from '../../../utils/account';
import { Heading, HeadingStyle } from '../Heading';

@observer
export class AccountHeading extends React.PureComponent<any, any> {
  render() {
    const { match } = this.props;
    return (
      <Heading headingStyle={HeadingStyle.Sub}>
        {isLogin(match) && lang.LOGIN()}
        {isCreatingAccount(match) && lang.CREATE_ACCOUNT()}
        {isRememberingPassword(match) && lang.FORGOT_PASSWORD()}
        {isRecoveringPassword(match) && lang.RECOVER_PASSWORD()}
      </Heading>
    );
  }
}

export interface Props extends RouteComponentProps<void> {}
