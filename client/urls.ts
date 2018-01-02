export const account = () => '/account';

export const createAccount = () => `${account()}/create-account`;

export const login = () => `${account()}/login`;

export const forgotPassword = () => `${account()}/forgot-password`;

export const recoverPassword = (id?: string) =>
  `${account()}/recover-password/${id || ':id'}`;

export const index = () => '/';

export const measurements = () => '/measurements';

function formatDate(date: Date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export const editMeasurements = (measuredAt?: Date) =>
  `${measurements()}/edit/${
    measuredAt ? formatDate(measuredAt) : ':measuredAt'
  }`;
