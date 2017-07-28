import { observer } from 'mobx-react';
import * as React from 'react';
import cx = require('classnames');
import {
  FlashMessageType,
  IFlashMessage,
} from '../../../../types/flash-messages';
import { FlashMessageStore } from '../../../stores/flash-message.store';
import { autobind } from 'core-decorators';

// tslint:disable-next-line:no-var-requires
const styles = require('./styles.scss');

@observer
export class FlashMessage extends React.PureComponent<Props, any> {
  @autobind
  didRemove() {
    this.props.removeMessage(this.props.index);
  }
  render() {
    const { message } = this.props;
    return (
      <div
        className={cx(styles.message, {
          [styles.success]: message.type === FlashMessageType.Success,
        })}
      >
        <p>
          {message.content}{' '}
          <span className={styles.close} onClick={this.didRemove}>
            ✕
          </span>
        </p>
      </div>
    );
  }
}

export interface Props {
  message: IFlashMessage;
  removeMessage: FlashMessageStore['removeMessage'];
  index: number;
}
