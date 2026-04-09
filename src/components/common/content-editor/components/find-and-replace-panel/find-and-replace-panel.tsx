import { useTranslation } from 'react-i18next';

import { isEmpty, noop } from 'lodash-es';

import { Button, Input } from '@components/ui';

import './find-and-replace-panel.styles.scss';
import useFindAndReplace from './use-find-and-replace';

const NAME_SPACE = 'find-and-replace-panel';

interface IProps {
  opened?: boolean;
  onConfirm?: (find: string, replace: string) => void;
  selectedText?: string;
}

function FindAndReplacePanel(props: IProps) {
  const { opened = false, onConfirm = noop, selectedText = '' } = props;
  const { t } = useTranslation();

  const { formValues, onFormChange, handleConfirm, handleKeyDown } =
    useFindAndReplace(onConfirm, selectedText);

  if (!opened) {
    return null;
  }

  return (
    <div className="relative">
      <div className={NAME_SPACE}>
        <div>
          <Input
            name="find"
            label={t('findWhat')}
            value={formValues.find}
            onChange={onFormChange}
            autoFocus={isEmpty(selectedText)}
            size="small"
          />
        </div>
        <div>
          <Input
            name="replace"
            label={t('replaceWith')}
            value={formValues.replace}
            onChange={onFormChange}
            onKeyDown={handleKeyDown}
            size="small"
            autoFocus={!isEmpty(selectedText)}
          />
        </div>

        <Button
          onClick={handleConfirm}
          disabled={isEmpty(formValues.find)}
          size="small"
        >
          {t('replace')}
        </Button>
      </div>
    </div>
  );
}

export default FindAndReplacePanel;
