import { AUTH_TOKEN } from '@storage';

export const AUTH_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: `Bearer ${AUTH_TOKEN}`,
};
