import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { isEmpty, isEqual, some } from 'lodash-es';

import { DialogConfirm } from '@components/ui';

import { TCategory } from '@types';

import { getObjectDiff } from '@utils';

import { TCategoryAction } from '../../types';
import CategoryForm from './category-form';
import { getModalLabels, getValue } from './utils';

const INITIAL_STATE: Partial<TCategory> = {
  name: '',
  description: '',
  slug: '',
};

interface IProps {
  data?: Partial<TCategory>;
  loading?: boolean;
  mode: TCategoryAction;
  onClose: () => void;
  onConfirm: (data: Partial<TCategory>) => void;
}

function CategoryModal(props: IProps) {
  const {
    data = INITIAL_STATE,
    loading = false,
    mode,
    onClose,
    onConfirm,
  } = props;

  const { t } = useTranslation();

  const [formData, setFormData] = useState<Partial<TCategory>>(data);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onConfirm({
      id: data?.id,
      ...(mode === 'edit' ? getObjectDiff(formData, data ?? {}) : formData),
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) =>
    setFormData({
      ...formData,
      [e.target.name]: getValue(e.target.name, e.target.value),
    });

  const isSubmitDisabled = useMemo(
    () =>
      some([formData.name, formData.slug], isEmpty) ||
      !formData.parent ||
      isEqual(formData, data),
    [formData, data],
  );

  const labels = useMemo(() => getModalLabels(mode, t), [mode, t]);

  return (
    <DialogConfirm
      title={labels.modalTitle as string}
      onCancel={onClose}
      onConfirm={handleSubmit as () => void}
      confirmDisabled={isSubmitDisabled}
      cancelBtnTitle={t('cancel')}
      confirmBtnTitle={labels.confirmBtnTitle as string}
      loading={loading}
    >
      <CategoryForm
        formData={formData}
        onSubmit={handleSubmit}
        onChange={handleChange}
      />
    </DialogConfirm>
  );
}

export default CategoryModal;
