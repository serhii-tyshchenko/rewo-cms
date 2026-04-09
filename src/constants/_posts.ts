import { TEmojiIcon } from '@types';

import { generateSortingConfig } from '@utils';

export const POSTS_SORTING_CONFIG = generateSortingConfig([
  'id',
  'title',
  'date',
]);

export const POSTS_DEFAULT_QUERY_PARAMS = {
  order: 'asc',
  orderby: 'id',
  page: 1,
  per_page: 50,
};

export const POSTS_STATUS_TO_ICON_MAP: Record<string, TEmojiIcon> = {
  future: 'calendar',
  draft: 'draft',
  pending: 'hourglass',
  private: 'lock',
  trash: 'trash',
};
