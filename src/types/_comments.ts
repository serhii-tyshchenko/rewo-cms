import { TListGenericData } from './_common';

export type TCommentStatus = 'approve' | 'hold' | 'spam' | 'trash';

export type TCommentDto = {
  author: number;
  author_name: string;
  date: string;
  id: number;
  post: number;
  status: TCommentStatus;
  content: {
    rendered: string;
  };
};

export type TComment = {
  authorId: number;
  authorName: string;
  date: string;
  id: number;
  postId: number;
  status: TCommentStatus;
  content: string;
};

export type TListCommentsData = TListGenericData<TComment>;

export type TListCommentsQueryParams = {
  page?: number;
  per_page?: number;
  search?: string;
  order?: 'asc' | 'desc';
  orderby?: 'id';
  status?: TCommentStatus;
};
