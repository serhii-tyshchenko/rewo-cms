import { generateSortingConfig } from '@utils';

export const CATEGORIES_SORTING_CONFIG = generateSortingConfig([
  'id',
  'name',
  'count',
]);

export const CATEGORIES_DEFAULT_QUERY_PARAMS = {
  order: 'asc',
  orderby: 'id',
  page: 1,
  per_page: 100,
  search: '',
};
