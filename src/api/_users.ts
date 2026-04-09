import { API_ROOT_URL } from '@constants';
import { ENDPOINT } from '@constants/_api';

import { TListUsersQueryParams } from '@types';

import { AUTH_HEADERS } from './constants';
import { formatListUsersResponse } from './formatters';
import { extractError, hasError, toQueryString } from './utils';

const BASE_URL = `${API_ROOT_URL}${ENDPOINT.USERS}`;

export const listUsers = async (queryParams: TListUsersQueryParams) => {
  try {
    const response = await fetch(
      // TODO: implement user roles and capabilities checks
      `${BASE_URL}?${toQueryString(queryParams)}&context=edit`,
      {
        method: 'GET',
        headers: AUTH_HEADERS,
      },
    );
    if (hasError(response)) {
      const errorData = await response.json();
      throw new Error(extractError(errorData));
    }
    const data = await response.json();
    return formatListUsersResponse(data, response.headers);
  } catch (error) {
    throw new Error(extractError(error as Error));
  }
};
