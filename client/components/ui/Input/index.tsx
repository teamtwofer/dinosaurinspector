import { autobind } from 'core-decorators';
import { FieldState } from 'formstate';
import { observer } from 'mobx-react';
import * as React from 'react';

// tslint:disable-next-line:no-var-requires
const classes = require('./style.scss');

export interface Props extends React.HTMLProps<HTMLInputElement> {
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
    const { name, field, type, ...rest } = this.props;
    return (
      <div>
        <label className={classes.label} htmlFor={name}>{name}</label>
        <input
          {...rest}
          type={type}
          id={name}
          name={name}
          onChange={this.onChange}
          value={field.value}
          className={field.hasError && classes.error}
        />
        {field.hasError && <p>{field.error}</p>}
      </div>
    );
  }
}
