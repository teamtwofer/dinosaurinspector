export function post<T extends object>(path: string, value: T) {
  return fetch(path, {
    body: JSON.stringify(value),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }).then(r => r.json());
}

export function patch<T extends object>(path: string, value: T) {
  return fetch(path, {
    body: JSON.stringify(value),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
  }).then(r => r.json());
}
