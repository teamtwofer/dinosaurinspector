import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { FlashMessageStore } from '../../../stores/flash-message.store';
import { Stores } from '../../../stores/index';
import { FlashMessage } from './FlashMessage';

// tslint:disable-next-line:no-var-requires
const styles = require('./styles.scss');

@inject(({ flashMessageStore }: Stores) => ({
  flashMessageStore,
}))
@observer
export class FlashMessages extends React.PureComponent<Props, any> {
  render() {
    const { messages, removeMessage } = this.props.flashMessageStore!;
    return (
      <section className={styles.messagesContainer}>
        {messages.map((m, i) => (
          <FlashMessage
            key={`${i}`}
            index={i}
            removeMessage={removeMessage}
            message={m}
          />
        ))}
      </section>
    );
  }
}

export interface Props {
  flashMessageStore?: FlashMessageStore;
}
