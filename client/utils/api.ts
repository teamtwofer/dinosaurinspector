export function post<T extends object>(path: string, value: T) {
  return fetch(path, {
    body: JSON.stringify(value),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }).then(r => r.json());
}
