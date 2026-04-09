import { TListGenericData } from './_common';

export type TPostStatus =
  | 'publish'
  | 'future'
  | 'draft'
  | 'pending'
  | 'trash'
  | 'private';

export type TPostDto = {
  author: number;
  id: number;
  categories: number[];
  content: {
    rendered: string;
  };
  date: string;
  excerpt: {
    rendered: string;
  };
  featured_media: number;
  link: string;
  meta: Record<string, string>;
  slug: string;
  status: TPostStatus;
  tags: number[];
  title: {
    rendered: string;
  };
};

export type TPost = {
  id: number;
  categories: number[];
  content: string;
  date: string;
  excerpt: string;
  featuredMedia: number;
  link: string;
  meta: Record<string, string>;
  slug: string;
  status: TPostStatus;
  tags: number[];
  title: string;
};

export type TListPost = Omit<TPost, 'content' | 'excerpt' | 'featuredMedia'>;

export type TListPostsData = TListGenericData<TListPost>;

export type TListPostsQueryParams = {
  page?: number;
  per_page?: number;
  search?: string;
  order?: 'asc' | 'desc';
  orderby?: 'id';
  tags?: number;
  categories?: number;
  status?: TPostStatus;
};
