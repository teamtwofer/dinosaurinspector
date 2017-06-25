import { FieldState } from 'formstate';
import { lang } from '../../lang';

export function required(fieldName: string) {
  return (val?: string) => !val && lang.REQUIRED_VALIDATOR(fieldName);
}

export function minLength(fieldName: string, length: number) {
  return (val?: string) =>
    val && val.length < length && lang.MIN_LENGTH_VALIDATOR(fieldName, length);
}

const emailRegex = /.+\@.+\..+/;

export function email(fieldName: string) {
  return (val?: string) =>
    !!val && !val.match(emailRegex) && lang.EMAIL_VALIDATOR(fieldName);
}

export function matchValue(fieldName: string, other: () => FieldState<any>) {
  return (val?: string) =>
    !!val && val !== other().$ && lang.MATCH_VALIDATOR(fieldName);
}
