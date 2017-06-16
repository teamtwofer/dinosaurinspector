import { observer } from 'mobx-react';
import { inject } from 'mobx-react';
import * as React from 'react';

import { UserStore } from '../stores/user.store';
import './style.scss';

export interface Props {
  userStore?: UserStore;
}

@inject('userStore')
@observer
export class Test extends React.PureComponent<Props, {}> {
  render() {
    const { isLoading, currentUser } = this.props.userStore!;
    return (
      <div className="test">
        hello {isLoading ? '...loading' : currentUser!.email} is there
      </div>
    );
  }
}
