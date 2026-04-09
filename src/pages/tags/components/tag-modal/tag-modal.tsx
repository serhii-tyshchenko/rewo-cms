import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { isEmpty, isEqual, some } from 'lodash-es';

import { DialogConfirm } from '@components/ui';

import { TTag } from '@types';

import { getObjectDiff } from '@utils';

import TagForm from './tag-form';

const initialState: Partial<TTag> = {
  name: '',
  slug: '',
  description: '',
};

interface IProps {
  data?: TTag;
  loading?: boolean;
  onClose: () => void;
  onConfirm: (data: Partial<TTag>) => void;
  mode: 'edit' | 'add';
}

function TagModal(props: IProps) {
  const { data = initialState, onClose, onConfirm, loading, mode } = props;
  const { t } = useTranslation();

  const [formData, setFormData] = useState<Partial<TTag>>(data);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const handleConfirm = () =>
    onConfirm({ id: data?.id, ...getObjectDiff(formData, data ?? {}) });

  const isSubmitDisabled =
    some([formData?.name, formData?.slug], isEmpty) || isEqual(formData, data);

  return (
    <DialogConfirm
      title={t(mode === 'edit' ? 'editTag' : 'addTag')}
      onCancel={onClose}
      onConfirm={handleConfirm}
      confirmDisabled={isSubmitDisabled}
      cancelBtnTitle={t('cancel')}
      confirmBtnTitle={t(mode === 'edit' ? 'save' : 'add')}
      loading={loading}
    >
      <TagForm formData={formData} onChange={handleChange} />
    </DialogConfirm>
  );
}

export default TagModal;
