import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectTheme } from '@store/selectors';

const useTheme = () => {
  const theme = useSelector(selectTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return theme;
};

export { useTheme };
