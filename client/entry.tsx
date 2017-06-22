declare const require: (s: string) => React.ComponentClass<any>;

import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { App } from './app';
import { LoginStore } from './stores/login.store';
import { UserStore } from './stores/user.store';

declare const module: any;

const rootEl = document.getElementById('root');

const userStore = new UserStore();
const loginStore = new LoginStore();

// tslint:disable-next-line:variable-name
const render = (Component: React.ComponentClass<any>) => {
  return ReactDOM.render(
    <AppContainer>
      <Provider userStore={userStore} loginStore={loginStore}>
        <Component />
      </Provider>
    </AppContainer>,
    rootEl
  );
};

render(App);

if (module.hot) {
  module.hot.accept(() => {
    // tslint:disable-next-line:variable-name
    const NewApp = require('./app');
    render(NewApp);
  });
}
