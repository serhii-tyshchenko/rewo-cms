import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { isEmpty } from 'lodash-es';

import { DialogConfirm, FormGroup, Input } from '@components/ui';

import { INITIAL_CONFIG } from './insert-image-modal.constants';
import { generateImage } from './insert-image-modal.utils';

interface IProps {
  onClose?: () => void;
  onConfirm?: (image: any) => void;
}

type TInsertImageConfig = {
  imageUrl: string;
  alt: string;
  classes: string;
};

function InsertImageModal(props: IProps) {
  const { onClose = null, onConfirm = null } = props;
  const { t } = useTranslation();
  const [config, setConfig] = useState<TInsertImageConfig>(INITIAL_CONFIG);

  const handleClose = useCallback((): void => {
    setConfig(INITIAL_CONFIG);
    if (onClose) onClose();
  }, [onClose]);

  const handleConfirm = (): void => {
    if (onConfirm) onConfirm(generateImage(config));
    handleClose();
  };

  const handleChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>): void => {
      const { name, value } = ev.target;
      setConfig((prevState) => ({ ...prevState, [name]: value }));
    },
    [setConfig],
  );

  const shouldDisableConfirm: boolean = isEmpty(config.imageUrl);

  return (
    <DialogConfirm
      title={t('insertImage')}
      onCancel={handleClose}
      onConfirm={handleConfirm}
      confirmDisabled={shouldDisableConfirm}
      cancelBtnTitle={t('cancel')}
      confirmBtnTitle={t('confirm')}
    >
      <FormGroup>
        <Input
          label={t('imageURL')}
          name="imageUrl"
          value={config.imageUrl}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Input
          label={t('altText')}
          name="alt"
          value={config.alt}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Input
          label={t('cssClasses')}
          name="classes"
          value={config.classes}
          onChange={handleChange}
        />
      </FormGroup>
    </DialogConfirm>
  );
}

export default InsertImageModal;
