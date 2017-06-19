import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { LoginContainer } from './components/LoginContainer';
import { UserStore } from './stores/user.store';
import { Test } from './test/test';

export interface Props {
  userStore?: UserStore;
}

@inject('userStore')
@observer
export class App extends React.PureComponent<Props, {}> {
  render() {
    const { user } = this.props.userStore!;
    return (
      <main>
        {user ? <Test /> : <LoginContainer />}
      </main>
    );
  }
}
