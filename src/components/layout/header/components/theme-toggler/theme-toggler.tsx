import { useTranslation } from 'react-i18next';

import { IconButton } from '@components/ui';

import { btnIconConfig } from './theme-toggler.constants';
import { useThemeToggler } from './use-theme-toggler';

function ThemeToggler() {
  const { t } = useTranslation();

  const { appTheme, handleThemeToggle } = useThemeToggler();

  return (
    <IconButton
      icon={btnIconConfig[appTheme as keyof typeof btnIconConfig]}
      onClick={handleThemeToggle}
      title={t('changeTheme')}
    />
  );
}

export default ThemeToggler;
