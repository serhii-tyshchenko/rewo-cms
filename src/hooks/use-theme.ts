import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectSettings } from '@store/selectors';

import { useSystemTheme } from './use-system-theme';

const useTheme = () => {
  const { theme } = useSelector(selectSettings);
  const systemTheme = useSystemTheme();

  useEffect(() => {
    const resolvedTheme = theme === 'system' ? systemTheme : theme;
    document.documentElement.setAttribute('data-theme', resolvedTheme);
  }, [theme, systemTheme]);

  return theme;
};

export { useTheme };
