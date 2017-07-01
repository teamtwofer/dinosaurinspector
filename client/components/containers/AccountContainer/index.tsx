import { observer } from 'mobx-react';
import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router';
import {
  createAccount,
  forgotPassword,
  login,
  recoverPassword,
} from '../../../urls';
import { CreateAccountContainer } from '../CreateAccountContainer';
import { ForgotPasswordContainer } from '../ForgotPasswordContainer';
import { LoginContainer } from '../LoginContainer';
import { RecoverPasswordContainer } from '../RecoverPasswordContainer';

@observer
export class AccountContainer extends React.PureComponent<Props, {}> {
  render() {
    return (
      <div>
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
      </div>
    );
  }
}

export interface Props extends RouteComponentProps<void> {}
