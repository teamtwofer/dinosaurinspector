import { lang } from '../../lang';

export function required(fieldName: string) {
  return (val?: string) => !val && lang.REQUIRED_VALIDATOR(fieldName);
}

export function minLength(fieldName: string, length: number) {
  return (val?: string) =>
    val && val.length < length && lang.MIN_LENGTH_VALIDATOR(fieldName, length);
}

export function email(fieldName: string) {
  return (val?: string) =>
    val &&
    !val.includes('@') &&
    !val.includes('.') &&
    lang.EMAIL_VALIDATOR(fieldName);
}
