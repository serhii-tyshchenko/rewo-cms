import { generateSortingConfig } from '@utils';

export const USER_ROLE = {
  ADMINISTRATOR: 'administrator',
  AUTHOR: 'author',
  CONTRIBUTOR: 'contributor',
  EDITOR: 'editor',
  SUBSCRIBER: 'subscriber',
};

export const USERS_SORTING_CONFIG = generateSortingConfig(['id', 'name']);

export const USERS_DEFAULT_QUERY_PARAMS = {
  order: 'asc',
  orderby: 'id',
  page: 1,
  per_page: 50,
  search: '',
};
