import classnames = require('classnames');
import Typography, { TypographyProps } from 'material-ui/Typography';
import * as React from 'react';
// tslint:disable-next-line:no-var-requires
const styles = require('./style.scss');

export enum HeadingStyle {
  Sub = 'sub',
  Accent = 'accent',
  Small = 'small',
  Title = 'title',
}

export class Heading extends React.PureComponent<Props, object> {
  render() {
    const { children, className, center, headingStyle, ...rest } = this.props;
    let displayType: TypographyProps['type'];
    switch (headingStyle) {
      case HeadingStyle.Title:
        displayType = 'title';
        break;
      case HeadingStyle.Small:
        displayType = 'subheading';
        break;
      case HeadingStyle.Accent:
        displayType = 'headline';
        break;
      case HeadingStyle.Sub:
        displayType = 'display1';
        break;
      default:
        displayType = 'display3';
    }
    return (
      <Typography
        gutterBottom
        type={displayType}
        className={classnames(className, styles.header, {
          [styles.center]: center,
        })}
        {...rest}
      >
        {children}
      </Typography>
    );
  }
}

export interface Props extends TypographyProps {
  center?: boolean;
  headingStyle?: HeadingStyle;
}
