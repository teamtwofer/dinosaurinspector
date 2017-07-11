import { observer } from 'mobx-react';
import * as React from 'react';
import { Loading } from '../Loading/index';

// tslint:disable-next-line:no-var-requires
const style = require('./style.scss');

@observer
export class Button extends React.PureComponent<Props, never> {
  render() {
    const { children, isLoading, ...rest } = this.props;
    return (
      <button
        {...rest}
        className={`${rest.className} ${style.button} ${isLoading
          ? style.isLoading
          : ''}`}
      >
        {isLoading ? <Loading /> : children}
      </button>
    );
  }
}

export interface Props extends React.HTMLProps<HTMLButtonElement> {
  isLoading?: boolean;
}
