import { TListGenericData } from './_common';

export type TMediaDto = {
  id: string;
  title: {
    rendered: string;
  };
  date: string;
  post: number;
  source_url: string;
  media_details?: {
    width?: number;
    height?: number;
    sizes: {
      thumbnail?: {
        source_url: string;
      };
    };
  };
};

export type TMedia = {
  id: string;
  title: string;
  date: string;
  postId: number;
  sourceUrl: string;
  sizes: string;
  thumbnail: string;
};

export type TListMediaData = TListGenericData<TMedia>;

export type TListMediaQueryParams = {
  page?: number;
  per_page?: number;
  search?: string;
  order?: 'asc' | 'desc';
  orderby?: 'id';
  _fields?: string;
};
