import { useSyncExternalStore } from 'react';

const getSnapshot = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const subscribe = (callback: () => void) => {
  const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQueryList.addEventListener('change', callback);
  return () => mediaQueryList.removeEventListener('change', callback);
};

export const useSystemTheme = () =>
  useSyncExternalStore(subscribe, getSnapshot);
