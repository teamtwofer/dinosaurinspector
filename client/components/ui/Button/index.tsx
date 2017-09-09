import MButton, { ButtonProps } from 'material-ui/Button/Button';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Loading } from '../Loading';

// tslint:disable-next-line:no-var-requires
const style = require('./style.scss');

@observer
export class Button extends React.PureComponent<Props, never> {
  render() {
    const { children, isLoading, removeMargin, ...rest } = this.props;
    return (
      <MButton
        className={!removeMargin ? style.button : ''}
        raised
        color="primary"
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
}
