import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { noop } from 'lodash-es';

import { DialogConfirm, FormGroup, Input, Select } from '@components/ui';

import { INITIAL_CONFIG } from './table-constructor-modal.constants';
import { generateTable } from './table-constructor-modal.utils';

type TTableConstructorConfig = {
  rows: number;
  columns: number;
  headers: 'none' | 'row' | 'column' | 'both';
  caption: string;
  classes: string;
};

interface IProps {
  onClose?: () => void;
  onConfirm?: (table: any) => void;
}

function TableConstructorModal(props: IProps) {
  const { onClose = noop, onConfirm = noop } = props;
  const { t } = useTranslation();
  const [config, setConfig] = useState<TTableConstructorConfig>(INITIAL_CONFIG);

  const handleClose = useCallback(() => {
    setConfig(INITIAL_CONFIG);
    onClose();
  }, [onClose]);

  const handleConfirm = () => {
    onConfirm(generateTable(config));
    handleClose();
  };

  const handleChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = ev.target;
      setConfig((prevState) => ({ ...prevState, [name]: value }));
    },
    [setConfig],
  );

  return (
    <DialogConfirm
      title={t('tableConstructor')}
      onCancel={handleClose}
      onConfirm={handleConfirm}
      cancelBtnTitle={t('cancel')}
      confirmBtnTitle={t('confirm')}
    >
      <FormGroup className="flex justify-between items-center gap-2">
        <div>
          <Input
            label={t('rows')}
            type="number"
            name="rows"
            min={1}
            value={config.rows}
            onChange={handleChange}
          />
        </div>
        <div>
          <Input
            label={t('columns')}
            type="number"
            name="columns"
            min={1}
            value={config.columns}
            onChange={handleChange}
          />
        </div>
        <div>
          <Select
            label={t('headers')}
            name="headers"
            options={[
              { value: 'none', label: t('tableHeaderOptions.none') },
              { value: 'row', label: t('tableHeaderOptions.firstRow') },
              { value: 'column', label: t('tableHeaderOptions.firstColumn') },
              { value: 'both', label: t('tableHeaderOptions.both') },
            ]}
            value={config.headers}
            onChange={handleChange}
          />
        </div>
      </FormGroup>
      <FormGroup>
        <Input
          label={t('caption')}
          name="caption"
          value={config.caption}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Input
          label={t('cssClasses')}
          name="classes"
          value={config.classes}
          onChange={handleChange}
          placeholder="tp-table tp-table--square"
        />
      </FormGroup>
    </DialogConfirm>
  );
}

export default TableConstructorModal;
