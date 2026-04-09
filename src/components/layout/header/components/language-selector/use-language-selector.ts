import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeLanguage } from 'i18next';

import { doUpdateSettings } from '@store/actions';
import { selectLanguage } from '@store/selectors';

const useLanguageSelector = () => {
  const dispatch = useDispatch();
  const currLanguage = useSelector(selectLanguage);

  useEffect(() => {
    if (currLanguage) {
      changeLanguage(currLanguage);
    }
  }, [currLanguage]);

  const onLanguageChange = useCallback(
    (evt: { target: { value: any } }) => {
      dispatch(doUpdateSettings({ language: evt.target.value }));
    },
    [dispatch],
  );

  return {
    currLanguage,
    onLanguageChange,
  };
};

export { useLanguageSelector };
