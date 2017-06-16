import { observer } from 'mobx-react';
import * as React from 'react';
import { Test } from './test/test';

@observer
export class App extends React.PureComponent<{}, {}> {
  render() {
    return (
      <main>
        <Test />
      </main>
    );
  }
}
