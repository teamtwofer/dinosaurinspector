import classnames = require('classnames');
import * as React from 'react';
// tslint:disable-next-line:no-var-requires
const styles = require('./style.scss');

export enum HeadingStyle {
  Sub = 'sub',
  Accent = 'accent',
  Small = 'small',
}

export class Heading extends React.PureComponent<Props, object> {
  render() {
    const { children, className, center, headingStyle, ...rest } = this.props;
    return (
      <h1
        {...rest}
        className={classnames(
          className,
          styles.header,
          headingStyle && styles[headingStyle],
          {
            [styles.center]: center,
          }
        )}
      >
        {children}
      </h1>
    );
  }
}

export interface Props extends React.HTMLProps<HTMLHeadingElement> {
  center?: boolean;
  headingStyle?: HeadingStyle;
}
