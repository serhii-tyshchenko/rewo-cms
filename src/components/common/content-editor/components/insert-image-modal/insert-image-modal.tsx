import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { isEmpty } from 'lodash-es';

import { DialogConfirm, FormGroup, Input, Select } from '@components/ui';

import { INITIAL_CONFIG } from './insert-image-modal.constants';
import { type TInsertImageConfig } from './insert-image-modal.types';
import { generateImage } from './insert-image-modal.utils';

interface IProps {
  onClose?: () => void;
  onConfirm?: (image: string) => void;
}

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
    (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
      const { name, value } = ev.target;
      setConfig((prevState) => ({ ...prevState, [name]: value }));
    },
    [setConfig],
  );

  const shouldDisableConfirm: boolean = isEmpty(config.src);

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
          name="src"
          value={config.src}
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
          name="class"
          value={config.class}
          onChange={handleChange}
        />
      </FormGroup>
      <div className="flex gap-2 mb-3">
        <div className="grow">
          <Select
            className="w-full"
            label={t('textEditor.loading')}
            name="loading"
            value={config.loading}
            onChange={handleChange}
            options={[
              { label: 'lazy', value: 'lazy' },
              { label: 'eager', value: 'eager' },
            ]}
          />
        </div>
        <div className="grow">
          <Select
            className="w-full"
            label={t('textEditor.decoding')}
            name="decoding"
            value={config.decoding}
            onChange={handleChange}
            options={[
              { label: 'async', value: 'async' },
              { label: 'eager', value: 'eager' },
            ]}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="grow">
          <Input
            type="number"
            label={t('textEditor.width')}
            name="width"
            value={config.width}
            onChange={handleChange}
          />
        </div>
        <div className="grow">
          <Input
            type="number"
            label={t('textEditor.height')}
            name="height"
            value={config.height}
            onChange={handleChange}
          />
        </div>
      </div>
    </DialogConfirm>
  );
}

export default InsertImageModal;
