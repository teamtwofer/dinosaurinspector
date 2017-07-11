import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import { autobind } from 'core-decorators';
import { RouteProps } from 'react-router';
import { AccountContainer } from './components/containers/AccountContainer';
import { Header } from './components/containers/Header/index';
import { NEXT } from './consts';
import { storage } from './storage';
import { UserStore } from './stores/user.store';
import { Test } from './test/test';
import { account, index, login } from './urls';

export interface Props extends RouteProps {}

export interface LoadingProps extends Props {
  userStore?: UserStore;
  props: RouteProps;
}

@observer
export class App extends React.PureComponent<Props, never> {
  render() {
    return (
      <Router>
        <main>
          <Header />
          <section className="padding-medium">
            <AuthRoute exact path={index()} component={Test} />
            <Route path={account()} component={AccountContainer} />
          </section>
        </main>
      </Router>
    );
  }
}

// tslint:disable-next-line:max-classes-per-file
@observer
export class AuthRoute extends React.Component<Props, never> {
  @autobind
  renderRoute(props: any) {
    return <LoadingRoute {...this.props} props={props} />;
  }
  render() {
    const { component: _component, ...rest } = this.props;

    return <Route {...rest} render={this.renderRoute} />;
  }
}

// tslint:disable-next-line:max-classes-per-file
@inject('userStore')
@observer
class LoadingRoute extends React.PureComponent<LoadingProps, never> {
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
      storage.setItem(NEXT, props.location!.pathname);
      return <Redirect to={login()} />;
    }
  }
}
