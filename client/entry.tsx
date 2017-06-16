declare const require: (s: string) => React.ComponentClass<any>;

import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { UserStore } from './stores/user.store';
import { Test } from './test/test';

declare const module: any;

const rootEl = document.getElementById('root');

const userStore = UserStore.create();

// tslint:disable-next-line:variable-name
const render = (Component: React.ComponentClass<any>) => {
  return ReactDOM.render(
    <AppContainer>
      <Provider userStore={userStore}>
        <Component />
      </Provider>
    </AppContainer>,
    rootEl
  );
};

render(Test);

if (module.hot) {
  module.hot.accept(() => {
    // tslint:disable-next-line:variable-name
    const NewTest = require('./test/test');
    render(NewTest);
  });
}
