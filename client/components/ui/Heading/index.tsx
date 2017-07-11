import * as React from 'react';

// tslint:disable-next-line:no-var-requires
const styles = require('./style.scss');

export class Heading extends React.PureComponent<
  React.HTMLProps<HTMLHeadingElement>,
  object
> {
  render() {
    const { children, ...rest } = this.props;
    return (
      <h1 {...rest} className={`${rest.className} ${styles.header}`}>
        {children}
      </h1>
    );
  }
}
