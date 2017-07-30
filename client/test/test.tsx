import { observer } from 'mobx-react';
import { inject } from 'mobx-react';
import * as React from 'react';

import { RouteComponentProps } from 'react-router';
import { UserStore } from '../stores/user.store';
// tslint:disable-next-line:no-var-requires
const classes = require('./style.scss');

export interface Props extends RouteComponentProps<void> {
  userStore?: UserStore;
}

@inject('userStore')
@observer
export class Test extends React.Component<Props, {}> {
  render() {
    const { isLoading, currentUser } = this.props.userStore!;
    return (
      <div className={classes.test}>
        hello {isLoading ? '...loading' : currentUser!.email} is there
      </div>
    );
  }
}
