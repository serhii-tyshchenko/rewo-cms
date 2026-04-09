import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number;
  [key: string]: unknown;
}

/**
 * Validates a JSON Web Token (JWT) by checking if it is present and not expired.
 *
 * @param {string | null | undefined} token - The JWT to be validated.
 * @returns {boolean} True if the token is valid (present and not expired), false otherwise.
 */
const isTokenExpired = (token: DecodedToken | null | undefined): boolean =>
  !!token && token.exp * 1000 < Date.now();

interface ValidateToken {
  (token: string | null | undefined): boolean;
}

/**
 * Validates a JSON Web Token (JWT) by checking if it is present and not expired.
 *
 * @param {string | null | undefined} token - The JWT to be validated.
 * @returns {boolean} True if the token is valid (present and not expired), false otherwise.
 */
export const validateToken: ValidateToken = (
  token: string | null | undefined,
): boolean => (!token ? false : !isTokenExpired(jwtDecode(token)));
