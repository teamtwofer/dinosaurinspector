import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import { autobind } from 'core-decorators';
import { RouteProps } from 'react-router';
import { AccountContainer } from './components/containers/AccountContainer';
import { UserStore } from './stores/user.store';
import { Test } from './test/test';
import { account, index, login } from './urls';

export interface Props extends RouteProps {
  userStore?: UserStore;
}

@observer
export class App extends React.PureComponent<Props, {}> {
  render() {
    return (
      <Router>
        <main>
          <AuthRoute exact path={index()} component={Test} />
          <Route path={account()} component={AccountContainer} />
        </main>
      </Router>
    );
  }
}

// tslint:disable-next-line:max-classes-per-file
@inject('userStore')
@observer
export class AuthRoute extends React.Component<Props, never> {
  @autobind
  renderRoute(props: any) {
    // tslint:disable-next-line:variable-name
    return <LoadingRoute {...this.props} props={props} />;
  }
  render() {
    const {
      userStore: _userStore,
      component: _component,
      ...rest,
    } = this.props;

    return <Route {...rest} render={this.renderRoute} />;
  }
}

// tslint:disable-next-line:max-classes-per-file
@inject('userStore')
@observer
class LoadingRoute extends React.PureComponent<any, object> {
  render() {
    // tslint:disable-next-line:variable-name
    const { userStore, component: Component, props } = this.props;
    const { currentUser, isLoading } = userStore!;
    if (isLoading) {
      return null;
    }
    if (currentUser) {
      return React.createElement(Component as any, props, null);
    } else {
      return <Redirect to={login()} />;
    }
  }
}
