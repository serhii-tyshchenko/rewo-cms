import type { TListCategoriesQueryParams } from 'types/_categories';

import { generateSortingConfig } from '@utils';

export const CATEGORIES_SORTING_CONFIG = generateSortingConfig([
  'id',
  'name',
  'count',
]);

export const CATEGORIES_DEFAULT_QUERY_PARAMS: TListCategoriesQueryParams = {
  order: 'asc',
  orderby: 'id',
  page: 1,
  per_page: 100,
  search: '',
  _fields: 'id,name,count,description,slug,parent,link',
};
