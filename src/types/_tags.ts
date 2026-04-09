import { TListGenericData } from './_common';

export type TTagDto = {
  count: number;
  description: string;
  id: number;
  name: string;
  slug: string;
};

export type TTag = {
  count: number;
  description: string;
  id: number;
  name: string;
  slug: string;
};

export type TListTagsData = TListGenericData<TTag>;

export type TListTagsQueryParams = {
  order?: 'asc' | 'desc';
  orderby?: 'id' | 'name' | 'count';
  page?: number;
  per_page?: number;
  search?: string;
};
