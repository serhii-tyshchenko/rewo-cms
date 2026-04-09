import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { IconButton } from '@components/ui';

import { doLogOut } from '@store/actions';

function AuthBtn() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleLogOutClick = useCallback(() => dispatch(doLogOut()), [dispatch]);

  return (
    <IconButton icon="user" title={t('logOut')} onClick={handleLogOutClick} />
  );
}

export default AuthBtn;
