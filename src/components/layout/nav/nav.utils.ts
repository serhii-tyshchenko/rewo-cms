import { TFunction } from 'i18next';

import { ROUTE } from '@constants/_common';

export const getNavLinks = (t: TFunction) => [
  {
    route: ROUTE.HOME,
    title: t('page.home'),
    icon: 'home',
  },
  {
    route: ROUTE.POSTS,
    title: t('page.posts'),
    icon: 'docs',
  },
  {
    route: ROUTE.CATEGORIES,
    title: t('page.categories'),
    icon: 'folder',
  },
  {
    route: ROUTE.TAGS,
    title: t('page.tags'),
    icon: 'tags',
  },
  {
    route: ROUTE.MEDIA,
    title: t('page.media'),
    icon: 'picture',
  },
  {
    route: ROUTE.USERS,
    title: t('page.users'),
    icon: 'user',
  },
  {
    route: ROUTE.COMMENTS,
    title: t('page.comments'),
    icon: 'comment',
  },
];
