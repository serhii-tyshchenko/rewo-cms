import { omit } from 'lodash-es';

import { API_ROOT_URL } from '@constants';
import { ENDPOINT } from '@constants/_api';

import { TListPostsQueryParams, TPost } from '@types';

import { AUTH_HEADERS } from './constants';
import {
  formatListPostsResponse,
  formatRetrievePostResponse,
} from './formatters';
import { extractError, hasError, toQueryString } from './utils';

const BASE_URL = `${API_ROOT_URL}${ENDPOINT.POSTS}`;

// TODO fix any
export const addPost = async (data: any) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: AUTH_HEADERS,
      body: JSON.stringify(data),
    });
    if (hasError(response)) {
      const errorData = await response.json();
      throw new Error(extractError(errorData));
    }
    return response.json();
  } catch (error) {
    throw new Error(extractError(error as Error));
  }
};

export const listPosts = async (queryParams: TListPostsQueryParams) => {
  try {
    const response = await fetch(`${BASE_URL}?${toQueryString(queryParams)}`, {
      headers: AUTH_HEADERS,
    });
    if (hasError(response)) {
      const errorData = await response.json();
      throw new Error(extractError(errorData));
    }
    const data = await response.json();
    return formatListPostsResponse(data, response.headers);
  } catch (error) {
    throw new Error(extractError(error as Error));
  }
};

export const retrievePost = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      headers: AUTH_HEADERS,
    });
    if (hasError(response)) {
      const errorData = await response.json();
      throw new Error(extractError(errorData));
    }
    const data = await response.json();
    return formatRetrievePostResponse(data);
  } catch (error) {
    throw new Error(extractError(error as Error));
  }
};

export const updatePost = async (data: TPost) => {
  try {
    const response = await fetch(`${BASE_URL}/${data.id}`, {
      method: 'POST',
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

export const patchPost = async (data: Partial<TPost>) => {
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

export const removePost = async (id: number, force: boolean = false) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}?force=${force}  `, {
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

export const removePosts = async (
  items: {
    id: number;
    force: boolean;
  }[],
) => {
  const requests = items.map(({ id, force }) => ({
    method: 'DELETE',
    path: `/wp/v2/posts/${id}?force=${force}`,
  }));
  try {
    const response = await fetch(`${API_ROOT_URL}/wp-json/batch/v1`, {
      method: 'POST',
      headers: AUTH_HEADERS,
      body: JSON.stringify({ requests }),
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
