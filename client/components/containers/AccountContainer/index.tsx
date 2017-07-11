import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router';
import { IForm } from '../../../../types/form';
import { NEXT } from '../../../consts';
import { storage } from '../../../storage';
import { Stores } from '../../../stores';
import { CreateAccountStore } from '../../../stores/create-account.store';
import { ForgotPasswordStore } from '../../../stores/forgot-password.store';
import { LoginStore } from '../../../stores/login.store';
import { UserStore } from '../../../stores/user.store';
import {
  createAccount,
  forgotPassword,
  login,
  recoverPassword,
} from '../../../urls';
import { redirectPath } from '../../../utils/account';
import { CreateAccountContainer } from '../CreateAccountContainer';
import { ForgotPasswordContainer } from '../ForgotPasswordContainer';
import { LoginContainer } from '../LoginContainer';
import { RecoverPasswordContainer } from '../RecoverPasswordContainer';

function isSuccess(...stores: Array<IForm<any>>): boolean {
  return stores.some(s => s.isSuccess);
}

@inject(
  ({
    createAccountStore,
    forgotPasswordStore,
    loginStore,
    userStore,
  }: Stores) => ({
    createAccountStore,
    forgotPasswordStore,
    loginStore,
    userStore,
  })
)
@observer
export class AccountContainer extends React.PureComponent<Props, {}> {
  render() {
    const next = storage.getItem(NEXT);
    const {
      createAccountStore,
      forgotPasswordStore,
      loginStore,
      userStore,
    } = this.props;
    return isSuccess(createAccountStore, forgotPasswordStore, loginStore) &&
    userStore.currentUser
      ? <Redirect to={redirectPath(next)} />
      : <div>
          <Route exact path={login()} component={LoginContainer} />
          <Route
            exact
            path={createAccount()}
            component={CreateAccountContainer}
          />
          <Route
            exact
            path={forgotPassword()}
            component={ForgotPasswordContainer}
          />
          <Route
            exact
            path={recoverPassword()}
            component={RecoverPasswordContainer}
          />
        </div>;
  }
}

export interface Props extends RouteComponentProps<void> {
  createAccountStore: CreateAccountStore;
  loginStore: LoginStore;
  forgotPasswordStore: ForgotPasswordStore;
  userStore: UserStore;
}
