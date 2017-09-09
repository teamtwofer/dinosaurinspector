import { AppBar } from 'material-ui';
import Toolbar from 'material-ui/Toolbar/Toolbar';
import Typography from 'material-ui/Typography';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Stores } from '../../../stores';

// tslint:disable-next-line:no-var-requires
const styles = require('./style.scss');

@inject(({ userStore }: Stores) => ({
  userStore,
}))
@observer
export class Header extends React.PureComponent<any, any> {
  render() {
    return (
      <AppBar
        color="primary"
        position="static"
        className={`${styles.header} padding-medium-horizontal`}
      >
        {/* <img
          className={`${styles.image} padding-small-vertical`}
          src={'/twoferlogo.jpg'}
        /> */}
        <Toolbar>
          <Typography type="title" color="inherit">
            Twofer
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}
