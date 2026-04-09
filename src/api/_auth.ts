import { API_ROOT_URL } from '@constants';

export const logIn = (username: string, password: string) =>
  fetch(`${API_ROOT_URL}/wp-json/jwt-auth/v1/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((response) => response.json())
    .then((data) => data);

export const getUserRole = (token: string) =>
  fetch(`${API_ROOT_URL}/wp-json/wp/v2/users/me?context=edit`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => data);
