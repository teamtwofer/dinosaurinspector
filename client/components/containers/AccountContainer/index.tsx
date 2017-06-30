import { observer } from 'mobx-react';
import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router';

import { createAccount, forgotPassword, login } from '../../../urls';

import { CreateAccountContainer } from '../CreateAccountContainer';
import { ForgotPasswordContainer } from '../ForgotPasswordContainer';
import { LoginContainer } from '../LoginContainer';

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
      </div>
    );
  }
}

export interface Props extends RouteComponentProps<void> {}
