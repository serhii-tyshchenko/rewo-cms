import { useTranslation } from 'react-i18next';

import { NotificationList } from '@components/ui';

import { toast } from './notification-store';
import { useNotifications } from './use-notifications';

export function NotificationService() {
  const notifications = useNotifications();

  const { t } = useTranslation();

  return (
    <NotificationList
      data={notifications}
      onClose={toast.dismiss}
      onClearAll={toast.dismissAll}
      clearAllLabel={t('clearAll')}
      closeButtonTitle={t('close')}
    />
  );
}
