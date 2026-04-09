import { isEmpty, noop } from 'lodash-es';

import { TNotification } from '@types';

import { Button } from '../button';
import { Notification } from './notification';
import './notification-list.styles.scss';

const NAME_SPACE = 'notifications-container';
const MAX_VISIBLE_NOTIFICATIONS = 3;

interface IProps {
  data: TNotification[];
  onClose?: (id: string) => void;
  onClearAll?: () => void;
  clearAllLabel?: string;
  closeButtonTitle?: string;
}

function NotificationList(props: IProps) {
  const {
    data,
    onClose = noop,
    onClearAll = noop,
    clearAllLabel = 'Clear All',
    closeButtonTitle = 'Close',
  } = props;

  if (isEmpty(data)) {
    return null;
  }

  const showClearAllButton = data.length > MAX_VISIBLE_NOTIFICATIONS;

  return (
    <div className={NAME_SPACE}>
      <ul className="mb-3">
        {data.map((notification) => (
          <Notification
            key={notification.id}
            data={notification}
            onClose={onClose}
            closeButtonTitle={closeButtonTitle}
          />
        ))}
      </ul>
      {showClearAllButton && (
        <Button onClick={onClearAll} size="small">
          {clearAllLabel}
        </Button>
      )}
    </div>
  );
}

export default NotificationList;
