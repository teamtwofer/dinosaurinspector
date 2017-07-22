import * as React from 'react';

// tslint:disable-next-line:no-var-requires
const styles = require('./style.scss');

export class Footer extends React.PureComponent<{}, {}> {
  render() {
    return (
      <footer className={`${styles.footer} padding-medium-horizontal`}>
        &copy; Twofer.co - Behind every keyboard is a person.
      </footer>
    );
  }
}
