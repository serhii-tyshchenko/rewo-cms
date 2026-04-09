import { createPortal } from 'react-dom';

import { FocusTrap } from 'focus-trap-react';

import { PORTAL_ROOT } from '@constants';

import { getClassName } from '@utils';

import { IconButton } from '../icon-button';
import './dialog.styles.scss';
import { useDialog } from './use-dialog';

const NAME_SPACE = 'ui-dialog';

interface IProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  footer?: React.ReactNode;
  style?: React.CSSProperties;
  testId?: string;
  closeButtonTitle?: string;
}

function Dialog(props: IProps) {
  const {
    title = 'Dialog title',
    onClose = () => {},
    children = null,
    className = '',
    disabled = false,
    footer = null,
    style = {},
    testId = 'ui-dialog',
    closeButtonTitle = 'Close',
  } = props;
  const dialogRef = useDialog(onClose);

  const componentClassName = getClassName(NAME_SPACE, className);

  return createPortal(
    <div className={`${NAME_SPACE}__backdrop`}>
      <FocusTrap>
        <dialog
          ref={dialogRef}
          aria-labelledby="ui-dialog-title"
          aria-modal="true"
          className={componentClassName}
          style={style}
          data-testid={testId}
        >
          <header className={`${NAME_SPACE}__header`}>
            <h4 id="ui-dialog-title" className={`${NAME_SPACE}__title`}>
              {title}
            </h4>
            <IconButton
              className={`${NAME_SPACE}__btn-close`}
              icon="cancel"
              onClick={onClose}
              title={closeButtonTitle}
              size="big"
              autoFocus
              disabled={disabled}
            />
          </header>
          <main className={`${NAME_SPACE}__main`}>{children}</main>
          {footer && (
            <footer className={`${NAME_SPACE}__footer`}>{footer}</footer>
          )}
        </dialog>
      </FocusTrap>
    </div>,
    PORTAL_ROOT,
  );
}

export default Dialog;
