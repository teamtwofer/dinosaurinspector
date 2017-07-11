import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Stores } from '../../../stores/index';

// tslint:disable-next-line:no-var-requires
const styles = require('./style.scss');

@inject(({ userStore }: Stores) => ({
  userStore,
}))
@observer
export class Header extends React.PureComponent<any, any> {
  render() {
    return (
      <header className={`${styles.header} padding-medium-horizontal`}>
        <img
          className={`${styles.image} padding-small-vertical`}
          src={'/twoferlogo.jpg'}
        />
      </header>
    );
  }
}
