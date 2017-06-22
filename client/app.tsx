import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import { RouteProps } from 'react-router';
import { LoginContainer } from './components/containers/LoginContainer';
import { UserStore } from './stores/user.store';
import { Test } from './test/test';

export interface Props extends RouteProps {
  userStore?: UserStore;
}

@observer
export class App extends React.PureComponent<Props, {}> {
  render() {
    return (
      <Router>
        <main>
          <AuthRoute exact path="/" component={Test} />
          <Route exact path="/login" component={LoginContainer} />
        </main>
      </Router>
    );
  }
}

// tslint:disable-next-line:max-classes-per-file
@inject('userStore')
export class AuthRoute extends React.PureComponent<Props, never> {
  render() {
    const { userStore, ...props } = this.props;
    const { currentUser } = userStore!;
    if (currentUser) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  }
}
