import { TPost } from './_posts';

export * from './_categories';
export * from './_comments';
export * from './_common';
export * from './_media';
export * from './_posts';
export * from './_tags';
export * from './_settings';
export * from './_users';

export type TPostFormData = TPost & {
  autoSlug?: boolean;
};
