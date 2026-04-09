import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { NotificationList } from '@components/ui';

import { doRemoveNotification, doRemoveNotifications } from '@store/actions';
import { selectNotifications } from '@store/selectors';

export function NotificationService() {
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);

  const { t } = useTranslation();

  const handleClose = useCallback(
    (id: string) => dispatch(doRemoveNotification(id)),
    [dispatch],
  );

  const handleClearAll = useCallback(
    () => dispatch(doRemoveNotifications()),
    [dispatch],
  );

  return (
    <NotificationList
      data={notifications}
      onClose={handleClose}
      onClearAll={handleClearAll}
      clearAllLabel={t('clearAll')}
      closeButtonTitle={t('close')}
    />
  );
}
