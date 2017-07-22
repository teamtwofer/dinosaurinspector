import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Redirect, RouteProps } from 'react-router';
import { NEXT } from '../../consts';
import { storage } from '../../storage';
import { Stores } from '../../stores/index';
import { UserStore } from '../../stores/user.store';
import { login } from '../../urls';

export interface LoadingProps extends RouteProps {
  userStore?: UserStore;
  props: RouteProps;
}

@inject(({ userStore }: Stores) => ({ userStore }))
@observer
export class LoadingRoute extends React.Component<LoadingProps, never> {
  render() {
    // tslint:disable-next-line:variable-name
    const { userStore, component: Component, props } = this.props;
    const { currentUser, isLoading } = userStore!;
    console.log('rendering loading route...');
    if (!Component) {
      throw new Error();
    }
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (currentUser) {
      return <Component {...props} />;
    } else {
      storage.setItem(NEXT, props.location!.pathname);
      return <Redirect to={login()} />;
    }
  }
}
