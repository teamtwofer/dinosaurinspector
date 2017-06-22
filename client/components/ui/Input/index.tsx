import { autobind } from 'core-decorators';
import { FieldState } from 'formstate';
import { observer } from 'mobx-react';
import * as React from 'react';

// tslint:disable-next-line:no-var-requires
const classes = require('./style.scss');

export interface Props {
  field: FieldState<string>;
  name: string;
  type?: string;
}

@observer
export class Input extends React.PureComponent<Props, never> {
  static defaultProps: Partial<Props> = {
    type: 'text',
  };

  @autobind
  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.field.onChange(e.currentTarget.value);
  }

  render() {
    const { name, field, type } = this.props;
    return (
      <div>
        <label className={classes.label} htmlFor={name}>{name}</label>
        <input
          type={type}
          id={name}
          name={name}
          onChange={this.onChange}
          value={field.value}
        />
      </div>
    );
  }
}
