import { omit } from 'lodash-es';

import { API_ROOT_URL } from '@constants';
import { ENDPOINT } from '@constants/_api';

import { TListTagsQueryParams, TTag } from '@types';

import { AUTH_HEADERS } from './constants';
import { formatListTagsResponse } from './formatters';
import { extractError, hasError, toQueryString } from './utils';

const BASE_URL = `${API_ROOT_URL}${ENDPOINT.TAGS}`;

export const listTags = async (queryParams: TListTagsQueryParams) => {
  try {
    const response = await fetch(`${BASE_URL}?${toQueryString(queryParams)}`);
    if (hasError(response)) {
      const errorData = await response.json();
      throw new Error(extractError(errorData));
    }
    const data = await response.json();
    return formatListTagsResponse(data, response.headers);
  } catch (error) {
    throw new Error(extractError(error as Error) || 'Failed to fetch tags');
  }
};

export const addTag = async (tagData: Partial<TTag>) => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: AUTH_HEADERS,
      body: JSON.stringify(tagData),
    });
    if (hasError(response)) {
      const errorData = await response.json();
      throw new Error(extractError(errorData));
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(extractError(error as Error));
  }
};

export const updateTag = async (data: Partial<TTag>) => {
  try {
    const response = await fetch(`${BASE_URL}/${data.id}`, {
      method: 'PATCH',
      headers: AUTH_HEADERS,
      body: JSON.stringify(omit(data, 'id')),
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

export const removeTag = async (id: number) => {
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
