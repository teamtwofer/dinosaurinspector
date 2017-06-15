import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import {Test} from './test/test';

declare const module: any;

const rootEl = document.getElementById('root');

// tslint:disable-next-line:variable-name
const render = (Component: React.ComponentClass<any>) => {
  return ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    rootEl,
  );
};

render(Test);

if (module.hot) {
  module.hot.accept('./test/test.tsx', () => render(Test));
}
