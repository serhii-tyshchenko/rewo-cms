import { isEmpty } from 'lodash-es';

import { extractHeadersData } from '@api/utils';

import { TListPostsData, TPost, TPostDto } from '@types';

export const formatListPostsResponse = (
  data: TPostDto[],
  headers: Headers,
): TListPostsData => ({
  ...extractHeadersData(headers),
  data: !isEmpty(data)
    ? data.map((entry) => ({
        id: entry.id,
        categories: entry.categories,
        date: entry.date,
        link: entry.link,
        meta: entry.meta,
        slug: decodeURIComponent(entry.slug),
        status: entry.status,
        tags: entry.tags,
        title: entry.title.rendered,
      }))
    : [],
});

export const formatRetrievePostResponse = (
  response: TPostDto,
): Partial<TPost> => ({
  id: response.id,
  title: response.title?.rendered,
  content: response.content?.rendered,
  date: response.date,
  link: response.link,
  categories: response.categories,
  excerpt: response.excerpt?.rendered,
  slug: decodeURIComponent(response.slug),
  featuredMedia: response.featured_media,
  meta: response.meta,
  tags: response.tags,
});

export const formatRetrievePostMetaFieldsResponse = (response: {
  schema: {
    properties: {
      meta: {
        properties: Record<string, { type: string }>;
      };
    };
  };
}) => {
  const metaFields = response.schema.properties.meta.properties ?? {};
  return Object.entries(metaFields).map(([name]) => name);
};
