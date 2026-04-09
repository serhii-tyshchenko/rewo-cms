import { useTranslation } from 'react-i18next';

import { Select } from '@components/ui';

import { LANGUAGES } from '@constants';

import './language-selector.styles.scss';
import { useLanguageSelector } from './use-language-selector';

const NAME_SPACE = 'language-selector';

function LanguageSelector() {
  const { t } = useTranslation();
  const { currLanguage, onLanguageChange } = useLanguageSelector();

  return (
    <Select
      name={NAME_SPACE}
      value={currLanguage}
      onChange={onLanguageChange}
      options={LANGUAGES}
      className={NAME_SPACE}
      title={t('changeLanguage')}
      size="small"
    />
  );
}

export default LanguageSelector;
