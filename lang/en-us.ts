import { MeasurementType } from '../types/measurement';

// tslint:disable:object-literal-sort-keys
export const enUS = {
  INVALID_EMAIL_OR_PASSWORD: () => 'Invalid email or password',
  REQUIRED_VALIDATOR: (name: string) => `${name} is required`,
  MIN_LENGTH_VALIDATOR: (name: string, length: number) =>
    `${name} must be at least ${length} characters long`,
  EMAIL_VALIDATOR: (name: string) =>
    `${name} must contain an AT sign and a PERIOD`,
  MATCH_VALIDATOR: (f: string) => `Must match the value of ${f}`,
  MIN_VALIDATOR: (f: string, min: number) => `${f} must be higher than ${min}`,
  LOGIN: () => 'Please log in',
  CREATE_ACCOUNT: () => 'Create Account',
  FORGOT_PASSWORD: () => 'Forgot Password',
  RECOVER_PASSWORD: () => 'Recover Password',
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
  IDEA: () => 'Track your weight-loss',
  ENTER_YOUR_MEASUREMENTS: () =>
    'Enter your measurements. Track your progress. Stay motivated.',
  GET_STARTED_TODAY: () => `
    Knowing if your diet or exercise routine is effective is a daunting task.
    This app exists to help you identify other metrics of your progress than just
    weight. 
  `,
  FLASH_CREATE_ACCOUNT: () => 'Your account was successfully created.',
  FLASH_LOGIN: () => 'Successfully Logged In!',
  FLASH_FORGOT_PASSWORD: () =>
    'If an account with this email has been created you should receive an email shortly.',
  FLASH_NEW_PASSWORD: () => 'Your new password has been set!',
  START: () => 'Get Started',
  MEASUREMENT_NAME: (measurementType: MeasurementType): string => {
    switch (measurementType) {
      case MeasurementType.BodyFat:
        return 'Body Fat';
      case MeasurementType.Bust:
        return 'Bust';
      case MeasurementType.Calves:
        return 'Calves';
      case MeasurementType.Chest:
        return 'Chest';
      case MeasurementType.Forearms:
        return 'Forearms';
      case MeasurementType.Hips:
        return 'Hips';
      case MeasurementType.Knees:
        return 'Knees';
      case MeasurementType.Midway:
        return 'Midway';
      case MeasurementType.Thighs:
        return 'Thighs';
      case MeasurementType.UpperArm:
        return 'UpperArm';
      case MeasurementType.Waist:
        return 'Waist';
    }
  },
  MEASUREMENT_UNIT: (measurementType: MeasurementType): string => {
    switch (measurementType) {
      case MeasurementType.BodyFat:
        return '%';
      default:
        return 'in.';
    }
  },
  SUBMIT_MEASUREMENTS: (_editing?: boolean) => 'Update',
};
// tslint:enable:object-literal-sort-keys
