import * as cx from 'classnames';
import MButton, { ButtonProps } from 'material-ui/Button/Button';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Loading } from '../Loading';

// tslint:disable-next-line:no-var-requires
const style = require('./style.scss');

@observer
export class Button extends React.PureComponent<Props, never> {
  component() {
    const { to } = this.props;
    return to && ((props: any) => <Link {...props} to={to} />);
  }

  render() {
    const {
      children,
      isLoading,
      removeMargin,
      center,
      to,
      ...rest
    } = this.props;
    return (
      <MButton
        className={cx({
          [style.button]: !removeMargin,
          [style.center]: center,
        })}
        raised
        color="primary"
        component={this.component()}
        {...rest}
      >
        {isLoading ? <Loading /> : children}
      </MButton>
    );
  }
}

export interface Props extends ButtonProps {
  isLoading?: boolean;
  removeMargin?: boolean;
  center?: boolean;
  to?: string;
}
