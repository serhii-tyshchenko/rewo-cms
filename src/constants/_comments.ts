import { generateSortingConfig } from '@utils';

export const COMMENTS_SORTING_CONFIG = generateSortingConfig(['id']);

export const COMMENTS_DEFAULT_QUERY_PARAMS = {
  order: 'asc',
  orderby: 'id',
  page: 1,
  per_page: 50,
  search: '',
  status: 'hold',
};
