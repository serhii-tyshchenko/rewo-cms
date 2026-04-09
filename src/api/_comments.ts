import { API_ROOT_URL } from '@constants';
import { ENDPOINT } from '@constants/_api';

import { TCommentStatus, TListCommentsQueryParams } from '@types';

import { AUTH_HEADERS } from './constants';
import { formatListCommentsResponse } from './formatters';
import { extractError, hasError, toQueryString } from './utils';

const BASE_URL = `${API_ROOT_URL}${ENDPOINT.COMMENTS}`;

export const listComments = async (queryParams: TListCommentsQueryParams) => {
  try {
    const response = await fetch(`${BASE_URL}?${toQueryString(queryParams)}`, {
      method: 'GET',
      headers: AUTH_HEADERS,
    });
    if (hasError(response)) {
      const errorData = await response.json();
      throw new Error(extractError(errorData));
    }
    const data = await response.json();
    return formatListCommentsResponse(data, response.headers);
  } catch (error) {
    throw new Error(extractError(error as Error));
  }
};

export const removeComment = async (id: number, status: TCommentStatus) => {
  try {
    const response = await fetch(
      `${BASE_URL}/${id}?force=${status === 'trash'}`,
      {
        method: 'DELETE',
        headers: AUTH_HEADERS,
      },
    );
    if (hasError(response)) {
      const errorData = await response.json();
      throw new Error(extractError(errorData));
    }
    return response.ok;
  } catch (error) {
    throw new Error(extractError(error as Error));
  }
};
