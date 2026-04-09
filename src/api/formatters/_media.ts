import { isEmpty } from 'lodash-es';

import {
  extractHeadersData,
  extractMediaSizes,
  extractThumbnailUrl,
} from '@api/utils';

import { TListMediaData, TMedia, TMediaDto } from '@types';

export const formatRetrieveMediaResponse = (data: TMediaDto): TMedia => ({
  id: data.id,
  title: data.title.rendered,
  date: data.date,
  postId: data.post,
  sourceUrl: data?.source_url ?? '',
  sizes: extractMediaSizes(data),
  thumbnail: extractThumbnailUrl(data),
});

export const formatListMediaResponse = (
  data: TMediaDto[],
  headers: Headers,
): TListMediaData => ({
  ...extractHeadersData(headers),
  data: !isEmpty(data)
    ? data.map(
        (item): TMedia => ({
          id: item.id,
          title: item.title.rendered,
          date: item.date,
          postId: item.post,
          sourceUrl: item?.source_url ?? '',
          sizes: extractMediaSizes(item),
          thumbnail: extractThumbnailUrl(item),
        }),
      )
    : [],
});
