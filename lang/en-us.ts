// tslint:disable:object-literal-sort-keys
export const enUS = {
  INVALID_EMAIL_OR_PASSWORD: () => 'Invalid email or password',
  REQUIRED_VALIDATOR: (name: string) => `${name} is required`,
  MIN_LENGTH_VALIDATOR: (name: string, length: number) =>
    `${name} must be at least ${length} characters long`,
  EMAIL_VALIDATOR: (name: string) =>
    `${name} must contain an AT sign and a PERIOD`,
  MATCH_VALIDATOR: (f: string) => `Must match the value of ${f}`,
  LOGIN: () => 'Please log in',
  CREATE_ACCOUNT: () => 'Create Account',
  FORGOT_PASSWORD: () => 'Forgot Password',
  NO_ACCOUNT: () => "Don't have an account?",
  CREATE_ONE: () => 'Create one',
  ACCOUNT_EXISTS: () => 'Already have an account?',
  LOGIN_INSTEAD: () => 'Login',
  CANT_REMEMBER: () => "Can't remember your password?",
  GET_A_NEW_ONE: () => 'Get a new one',
  EXPLAIN_FORGOT_PASSWORD: () => `
    For security reasons we do not save your password.
    As a result, we must send you a new one.
    Please enter your email below and it will send you an
    email with a link where your password can be reset.
    Your password will not be reset until you fill out the form
    on the corresponding page.
  `,
  SEND_RECOVERY_EMAIL: () => 'Send Recovery Email',
  IDEATION: () => 'Twofer is still under ideation.',
  THANKS_FOR_VISITING: () => 'Thank you for checking out our site!',
  WHY_NO_CONTENT: () => `
    We are currently in the process of ethnography to determine what we
    are going to build. We should have some updates soon.
  `,
};
// tslint:enable:object-literal-sort-keys
