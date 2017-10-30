import * as React from 'react';

// tslint:disable-next-line:no-var-requires
const styles = require('./style.scss');

export class MainContent extends React.Component<{}, {}> {
  render() {
    return (
      <section className={styles.mainContent}>{this.props.children}</section>
    );
  }
}
