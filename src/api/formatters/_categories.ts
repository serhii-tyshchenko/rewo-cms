import { isEmpty } from 'lodash-es';

import { extractHeadersData } from '@api/utils';

import { TCategoryDto, TListCategoriesData } from '@types';

export const formatListCategoriesResponse = (
  data: TCategoryDto[],
  headers: Headers,
): TListCategoriesData => ({
  ...extractHeadersData(headers),
  data: !isEmpty(data)
    ? data.map(
        (item): TCategoryDto => ({
          id: item.id,
          name: item.name,
          count: item.count,
          slug: decodeURIComponent(item.slug),
          description: item.description,
          link: item.link,
          parent: item.parent,
        }),
      )
    : [],
});
