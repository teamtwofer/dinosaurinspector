import { match as Match } from 'react-router';
import { account, createAccount, forgotPassword, login } from '../urls';

export function isLogin(match: Match<void>) {
  return match.url.includes(login());
}

export function isCreatingAccount(match: Match<void>) {
  return match.url.includes(createAccount());
}

export function isRememberingPassword(match: Match<void>) {
  return match.url.includes(forgotPassword());
}

export function isRecoveringPassword(match: Match<void>) {
  return match.url.includes('/recover-password/');
}

export function redirectPath(path?: string | null) {
  return !path || path.includes(account()) ? '/' : path;
}
