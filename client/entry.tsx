import './globals.scss';
import './styles/paddings.scss';

import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { App } from './app';
import { CreateAccountStore } from './stores/create-account.store';
import { ForgotPasswordStore } from './stores/forgot-password.store';
import { LoginStore } from './stores/login.store';
import { RecoverPasswordStore } from './stores/recover-password.store';
import { UserStore } from './stores/user.store';

declare const module: any;

const rootEl = document.getElementById('root');

const userStore = new UserStore();
const loginStore = new LoginStore();
const createAccountStore = new CreateAccountStore();
const forgotPasswordStore = new ForgotPasswordStore();
const recoverPasswordStore = new RecoverPasswordStore();

// tslint:disable-next-line:variable-name
const render = (Component: React.ComponentClass<any>) => {
  return ReactDOM.render(
    <AppContainer>
      <Provider
        userStore={userStore}
        loginStore={loginStore}
        createAccountStore={createAccountStore}
        forgotPasswordStore={forgotPasswordStore}
        recoverPasswordStore={recoverPasswordStore}
      >
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
