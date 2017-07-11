import { TOKEN } from '../consts';
import { storage } from '../storage';

export function headers() {
  const token = storage.getItem(TOKEN);
  return {
    'Content-Type': 'application/json',
    'x-access-token': token,
  };
}

export function post<T extends object>(path: string, value: T) {
  return fetch(path, {
    body: JSON.stringify(value),
    headers: headers(),
    method: 'POST',
  }).then(r => r.json());
}

export function patch<T extends object>(path: string, value: T) {
  return fetch(path, {
    body: JSON.stringify(value),
    headers: headers(),
    method: 'PATCH',
  }).then(r => r.json());
}

export function get(path: string) {
  return fetch(path, {
    headers: headers(),
    method: 'GET',
  }).then(r => r.json());
}
