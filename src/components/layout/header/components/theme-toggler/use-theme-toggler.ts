import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { doUpdateSettings } from '@store/actions';
import { selectTheme } from '@store/selectors';

import { themeToggleConfig } from './theme-toggler.constants';

const useThemeToggler = () => {
  const dispatch = useDispatch();
  const appTheme = useSelector(selectTheme);

  const handleThemeToggle = useCallback(() => {
    dispatch(
      doUpdateSettings({
        theme: themeToggleConfig[appTheme as keyof typeof themeToggleConfig],
      }),
    );
  }, [appTheme, dispatch]);

  return {
    handleThemeToggle,
    appTheme,
  };
};

export { useThemeToggler };
