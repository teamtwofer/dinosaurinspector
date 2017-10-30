import { observer } from 'mobx-react';
import * as React from 'react';

@observer
export class ErrorMessage extends React.PureComponent<Props, never> {
  render() {
    const { error } = this.props;
    return error ? <p>{error}</p> : null;
  }
}

export interface Props {
  error: string | undefined | null;
}
