import { autobind } from 'core-decorators';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Route, RouteProps } from 'react-router';
import { LoadingRoute } from './LoadingRoute';

@observer
export class AuthRoute extends React.Component<RouteProps, never> {
  @autobind
  renderRoute(props: any) {
    return <LoadingRoute {...this.props} props={props} />;
  }
  render() {
    const { component: _component, ...rest } = this.props;
    return <Route {...rest} render={this.renderRoute} />;
  }
}
