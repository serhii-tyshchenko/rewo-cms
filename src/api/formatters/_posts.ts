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
  categories: response.categories,
  content: response.content?.rendered,
  date: response.date,
  excerpt: response.excerpt?.rendered,
  id: response.id,
  featuredMedia: response.featured_media,
  link: response.link,
  meta: response.meta,
  slug: decodeURIComponent(response.slug),
  status: response.status,
  tags: response.tags,
  title: response.title?.rendered,
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
