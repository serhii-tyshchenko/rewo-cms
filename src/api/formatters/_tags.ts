import { isEmpty } from 'lodash-es';

import { extractHeadersData } from '@api/utils';

import { TListTagsData, TTag, TTagDto } from '@types';

export const formatListTagsResponse = (
  data: TTagDto[],
  headers: Headers,
): TListTagsData => ({
  ...extractHeadersData(headers),
  data: !isEmpty(data)
    ? data
        .map(
          (item): TTag => ({
            count: item.count,
            description: item.description,
            id: item.id,
            name: item.name,
            slug: item.slug,
          }),
        )
        .sort((a, b) => a.name.localeCompare(b.name))
    : [],
});
