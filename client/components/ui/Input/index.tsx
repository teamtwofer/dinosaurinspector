import { autobind } from 'core-decorators';
import { FieldState } from 'formstate';
import FormControl from 'material-ui/Form/FormControl';
import FormHelperText from 'material-ui/Form/FormHelperText';
import MInput, { InputProps } from 'material-ui/Input/Input';
import InputLabel from 'material-ui/Input/InputLabel';
import { observer } from 'mobx-react';
import * as React from 'react';

// tslint:disable-next-line:no-var-requires
const classes = require('./style.scss');

export interface Props extends InputProps {
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
  onChange(e: React.FormEvent<any>) {
    this.props.field.onChange(e.currentTarget.value);
  }

  render() {
    const { name, field, type, ...rest } = this.props;
    return (
      <FormControl className={classes.input}>
        <InputLabel
          error={field.hasError}
          className={classes.label}
          htmlFor={name}
        >
          {name}
        </InputLabel>
        <MInput
          {...rest}
          error={field.hasError}
          fullWidth
          type={type}
          id={name}
          name={name}
          onChange={this.onChange}
          value={field.value}
        />
        <FormHelperText error={field.hasError}>
          {field.hasError && field.error}&nbsp;
        </FormHelperText>
      </FormControl>
    );
  }
}
