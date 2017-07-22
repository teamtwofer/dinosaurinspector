import * as React from 'react';
import { withRouter } from 'react-router';

// tslint:disable-next-line:no-var-requires
const styles = require('./style.scss');

export class MainGrid extends React.Component<any, {}> {
  render() {
    return (
      <main className={styles.grid}>
        {this.props.children}
      </main>
    );
  }
}

// tslint:disable-next-line:variable-name
export default withRouter(MainGrid);
