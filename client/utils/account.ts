import { match as Match } from 'react-router';
import { createAccount, forgotPassword, login } from '../urls';

export function isLogin(match: Match<void>) {
  return match.url.includes(login());
}

export function isCreatingAccount(match: Match<void>) {
  return match.url.includes(createAccount());
}

export function isRememberingPassword(match: Match<void>) {
  return match.url.includes(forgotPassword());
}
