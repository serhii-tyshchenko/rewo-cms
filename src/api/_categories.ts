import { API_ROOT_URL } from '@constants';
import { ENDPOINT } from '@constants/_api';

import { TCategory, TListCategoriesQueryParams } from '@types';

import { AUTH_HEADERS } from './constants';
import { formatListCategoriesResponse } from './formatters';
import { extractError, hasError, toQueryString } from './utils';

const BASE_URL = `${API_ROOT_URL}${ENDPOINT.CATEGORIES}`;

export const listCategories = async (
  queryParams: TListCategoriesQueryParams,
) => {
  try {
    const response = await fetch(`${BASE_URL}?${toQueryString(queryParams)}`);

    const data = await response.json();

    if (hasError(response)) {
      throw new Error(extractError(data));
    }

    return formatListCategoriesResponse(data, response.headers);
  } catch (error) {
    throw new Error(extractError(error as Error));
  }
};

export const listCategoriesById = (id: number) =>
  fetch(`${BASE_URL}?parent=${id}&per_page=100&hide_empty=false`)
    .then((response) => response.json())
    .then((data) => data);

export const listCategoriesByParentId = async (id: number) => {
  try {
    const response = await fetch(
      `${BASE_URL}?parent=${id}&per_page=100&hide_empty=false`,
    );
    if (hasError(response)) {
      const errorData = await response.json();
      throw new Error(extractError(errorData));
    }

    const data = await response.json();

    return formatListCategoriesResponse(data, response.headers);
  } catch (error) {
    throw new Error(extractError(error as Error));
  }
};

export const createCategory = async (data: Partial<TCategory>) => {
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

    return response.ok;
  } catch (error) {
    throw new Error(extractError(error as Error));
  }
};

export const updateCategory = async (
  id: number | undefined,
  data: Partial<TCategory>,
) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: AUTH_HEADERS,
      body: JSON.stringify(data),
    });
    if (hasError(response)) {
      const errorData = await response.json();
      throw new Error(extractError(errorData));
    }
    return response.ok;
  } catch (error) {
    throw new Error(
      extractError(error as Error) || 'Failed to update category',
    );
  }
};

export const removeCategory = async (id: number, force = true) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}?force=${force}`, {
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
