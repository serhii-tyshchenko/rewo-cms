import type { TListTagsQueryParams } from '@types';

import { generateSortingConfig } from '@utils';

export const TAGS_SORTING_CONFIG = generateSortingConfig([
  'id',
  'name',
  'count',
]);

export const TAG_MODAL_TYPE = {
  ADD_TAG: 'ADD_TAG',
  EDIT_TAG: 'EDIT_TAG',
  REMOVE_TAG: 'REMOVE_TAG',
};

export const TAG_ACTION = {
  ADD: 'ADD',
  EDIT: 'EDIT',
  REMOVE: 'REMOVE',
};

export const TAGS_DEFAULT_QUERY_PARAMS: TListTagsQueryParams = {
  order: 'asc',
  orderby: 'id',
  page: 1,
  per_page: 100,
  search: '',
  _fields: 'id,name,count,description,slug',
};
