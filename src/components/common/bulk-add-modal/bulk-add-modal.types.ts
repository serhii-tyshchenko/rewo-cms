import type { TPostStatus } from 'types/_posts';

export type TCsvEntry = {
  categories: string;
  slug: string;
  status?: TPostStatus;
  title: string;
  [key: string]: string | undefined;
};
