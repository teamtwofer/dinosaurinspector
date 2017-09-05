import 'reflect-metadata';
import './globals.scss';
import './styles/paddings.scss';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Container } from 'typedi/Container';
import { App } from './app';
import { CreateAccountStore } from './stores/create-account.store';
import { FlashMessageStore } from './stores/flash-message.store';
import { ForgotPasswordStore } from './stores/forgot-password.store';
import { LoginStore } from './stores/login.store';
import { RecoverPasswordStore } from './stores/recover-password.store';
import { ThemeStore } from './stores/theme.store';
import { UserStore } from './stores/user.store';

declare const module: any;

const rootEl = document.getElementById('root');

const userStore = Container.get(UserStore);
const flashMessageStore = Container.get(FlashMessageStore);
const loginStore = Container.get(LoginStore);
const createAccountStore = Container.get(CreateAccountStore);
const forgotPasswordStore = Container.get(ForgotPasswordStore);
const recoverPasswordStore = Container.get(RecoverPasswordStore);

const { theme } = Container.get(ThemeStore);

// tslint:disable-next-line:variable-name
const render = (Component: React.ComponentClass<any>) => {
  return ReactDOM.render(
    <AppContainer>
      <MuiThemeProvider theme={theme}>
        <Provider
          userStore={userStore}
          loginStore={loginStore}
          createAccountStore={createAccountStore}
          forgotPasswordStore={forgotPasswordStore}
          recoverPasswordStore={recoverPasswordStore}
          flashMessageStore={flashMessageStore}
        >
          <Component />
        </Provider>
      </MuiThemeProvider>
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
