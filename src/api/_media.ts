import { API_ROOT_URL } from '@constants';
import { ENDPOINT } from '@constants/_api';

import { TListMediaQueryParams } from '@types';

import { AUTH_HEADERS } from './constants';
import {
  formatListMediaResponse,
  formatRetrieveMediaResponse,
} from './formatters';
import { extractError, hasError, toQueryString } from './utils';

const BASE_URL = `${API_ROOT_URL}${ENDPOINT.MEDIA}`;

export const listMedia = async (queryParams: TListMediaQueryParams) => {
  try {
    const response = await fetch(`${BASE_URL}?${toQueryString(queryParams)}`);
    if (hasError(response)) {
      const errorData = await response.json();
      throw new Error(extractError(errorData));
    }
    const data = await response.json();
    return formatListMediaResponse(data, response.headers);
  } catch (error) {
    throw new Error(extractError(error as Error));
  }
};

export const retrieveMedia = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (hasError(response)) {
      const errorData = await response.json();
      throw new Error(extractError(errorData));
    }
    const data = await response.json();
    return formatRetrieveMediaResponse(data);
  } catch (error) {
    throw new Error(extractError(error as Error));
  }
};

export const removeMedia = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}?force=true`, {
      method: 'DELETE',
      headers: AUTH_HEADERS,
    });
    if (hasError(response)) {
      const errorData = await response.json();
      throw new Error(extractError(errorData));
    }
    return response.ok;
  } catch (error) {
    throw new Error(extractError(error as Error));
  }
};
