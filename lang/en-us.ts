// tslint:disable:object-literal-sort-keys
export const enUS = {
  INVALID_EMAIL_OR_PASSWORD: () => 'Invalid email or password',
  REQUIRED_VALIDATOR: (name: string) => `${name} is required`,
  MIN_LENGTH_VALIDATOR: (name: string, length: number) =>
    `${name} must be at least ${length} characters long`,
  EMAIL_VALIDATOR: (name: string) =>
    `${name} must contain an AT sign and a PERIOD`,
  MATCH_VALIDATOR: (f: string) => `Must match the value of ${f}`,
};
// tslint:enable:object-literal-sort-keys
