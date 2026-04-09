import { generateSortingConfig } from '@utils';

export const MEDIA_SORTING_CONFIG = generateSortingConfig([
  'id',
  'title',
  'date',
]);

export const MEDIA_DEFAULT_QUERY_PARAMS = {
  order: 'asc',
  orderby: 'id',
  page: 1,
  per_page: 50,
  search: '',
};
