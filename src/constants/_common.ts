export const ONE_SECOND_IN_MS = 1000;

export const ROUTE = {
  CATEGORIES: '/categories',
  COMMENTS: '/comments',
  POST_ADD: '/posts/add',
  POST_EDIT: '/posts/:postId',
  POSTS: '/posts',
  HOME: '/',
  LOGIN: '/login',
  MEDIA: '/media',
  SETTINGS: '/settings',
  TAGS: '/tags',
  USERS: '/users',
};

export const API_ROOT_URL = import.meta.env.VITE_API_ROOT_URL;
export const APP_ROOT = document.getElementById('root');
export const APP_NAME = 'ReWo CMS';
export const PORTAL_ROOT = document.getElementById('portal-root')!;
export const LS_KEY_NAME = APP_NAME;

export const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'uk', label: 'Українська' },
];

export const BATCH_ENTRIES_LIMIT = 25;
