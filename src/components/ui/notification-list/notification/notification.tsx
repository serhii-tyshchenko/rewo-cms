import { useEffect, useRef } from 'react';

import { noop } from 'lodash-es';

import { TNotification } from '@types';

import { getClassName } from '@utils';

import { IconButton } from '../../icon-button';
import './notification.styles.scss';

const NAME_SPACE = 'notification';

interface IProps {
  data: TNotification;
  className?: string;
  onClose?: (id: TNotification['id']) => void;
  closeButtonTitle?: string;
}

function Notification(props: IProps) {
  const {
    onClose = noop,
    data: { id, type, message, autoclose, delay },
    className = '',
    closeButtonTitle = 'Close',
  } = props;

  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (autoclose) {
      timerRef.current = setTimeout(() => onClose(id), delay);
    }
    return () => clearTimeout(timerRef.current);
  }, []);

  const handleCloseClick = () => onClose(id);

  const componentClassName = getClassName(
    NAME_SPACE,
    {
      [`${NAME_SPACE}--${type}`]: type,
    },
    className,
  );

  return (
    <li className={componentClassName}>
      <main className={`${NAME_SPACE}__content`}>
        <span
          className={`${NAME_SPACE}__message`}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: message }}
        />
      </main>
      <IconButton
        icon="cancel"
        onClick={handleCloseClick}
        title={closeButtonTitle}
        className={`${NAME_SPACE}__close-btn`}
      />
    </li>
  );
}

export default Notification;
