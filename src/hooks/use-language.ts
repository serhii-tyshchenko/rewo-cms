import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { changeLanguage } from 'i18next';

import { selectSettings } from '@store/selectors';

const useLanguage = () => {
  const { language } = useSelector(selectSettings);

  useEffect(() => {
    changeLanguage(language);
  }, [language]);

  return language;
};

export { useLanguage };
