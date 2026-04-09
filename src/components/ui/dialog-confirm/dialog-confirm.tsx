import React from 'react';

import { Button } from '../button';
import { Dialog } from '../dialog';

interface IProps {
  title?: string;
  confirmBtnTitle?: React.ReactNode | string;
  cancelBtnTitle?: string;
  cancelDisabled?: boolean;
  confirmDisabled?: boolean;
  closeDisabled?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  closeButtonTitle?: string;
}

function DialogConfirm(props: IProps) {
  const {
    title = 'Dialog Confirm Title',
    onCancel,
    onConfirm,
    children,
    cancelBtnTitle = 'Cancel',
    confirmBtnTitle = 'Confirm',
    className,
    cancelDisabled = false,
    confirmDisabled = false,
    closeDisabled = false,
    loading = false,
    closeButtonTitle = 'Close',
  } = props;

  const footer = (
    <>
      <Button
        variant="secondary"
        onClick={onCancel}
        disabled={loading || cancelDisabled}
      >
        {cancelBtnTitle}
      </Button>
      <Button
        variant="primary"
        onClick={onConfirm}
        disabled={loading || confirmDisabled}
      >
        {confirmBtnTitle}
      </Button>
    </>
  );

  return (
    <Dialog
      title={title}
      onClose={onCancel}
      className={className}
      disabled={loading || closeDisabled}
      footer={footer}
      closeButtonTitle={closeButtonTitle}
    >
      {children}
    </Dialog>
  );
}

export default DialogConfirm;
