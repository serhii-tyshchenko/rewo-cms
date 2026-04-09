import { TPostFormData } from '@types';

export const INITIAL_STATE = {
  title: '',
  slug: '',
  autoSlug: true,
  content: '',
  excerpt: '',
  categories: [] as number[],
  meta: {},
  tags: [],
} as Partial<TPostFormData>;
