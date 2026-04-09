import { useTranslation } from 'react-i18next';

import { Button } from '@components/ui';

interface IProps {
  editMode?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

function PostSubmitButton(props: IProps) {
  const { editMode = false, disabled = false, onClick } = props;
  const { t } = useTranslation();

  const buttonTitle = editMode ? t('save') : t('add');
  const buttonLabel = t(editMode ? 'save' : 'add');

  return (
    <Button
      className="w-full mt-auto"
      disabled={disabled}
      onClick={onClick}
      size="big"
      title={buttonTitle}
    >
      {buttonLabel}
    </Button>
  );
}

export default PostSubmitButton;
