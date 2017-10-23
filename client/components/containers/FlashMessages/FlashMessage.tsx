import { autobind } from 'core-decorators';
import Button from 'material-ui/Button/Button';
import SnackbarContent from 'material-ui/Snackbar/SnackbarContent';
import { observer } from 'mobx-react';
import * as React from 'react';
import { IFlashMessage } from '../../../../types/flash-messages';
import { FlashMessageStore } from '../../../stores/flash-message.store';

// tslint:disable-next-line:no-var-requires
// const styles = require('./styles.scss');

@observer
export class FlashMessage extends React.PureComponent<Props, any> {
  @autobind
  didRemove() {
    this.props.removeMessage(this.props.index);
  }
  render() {
    const { message } = this.props;
    return message.content
      ? <SnackbarContent
          message={message.content}
          action={
            <Button color="accent" dense onClick={this.didRemove}>
              close
            </Button>}
          // tslint:disable-next-line:jsx-alignment
        />
      : null;
  }
}

export interface Props {
  message: IFlashMessage;
  removeMessage: FlashMessageStore['removeMessage'];
  index: number;
}
