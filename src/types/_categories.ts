import { TListGenericData } from './_common';

export type TCategoryDto = {
  count: number;
  description: string;
  id: number;
  link: string;
  name: string;
  parent: number;
  slug: string;
};

export type TCategory = {
  count: number;
  description: string;
  id: number;
  link: string;
  name: string;
  parent: number | undefined;
  slug: string;
};

export type TListCategoriesData = TListGenericData<TCategory>;

export type TListCategoriesQueryParams = {
  order?: 'asc' | 'desc';
  orderby?: 'id' | 'name' | 'count';
  page?: number;
  parent?: number;
  per_page?: number;
  search?: string;
  _fields?: string;
};
