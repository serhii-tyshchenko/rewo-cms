import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { isEmpty, isEqual, some } from 'lodash-es';

import { PostTagsManager } from '@components/common/entry-form/components/right-panel/components';
import { DialogConfirm, FormGroup, Input, Select } from '@components/ui';

import { TCategory, TListPost, TTag } from '@types';

import { formatOptions, getObjectDiff, makeConfig } from '@utils';

export const getConfig = (val: string) => ({
  categories: [Number(val)],
  default: val,
});

interface IProps {
  allCategories: TCategory[];
  allTags: TTag[];
  data?: TListPost;
  loading?: boolean;
  onClose: () => void;
  onConfirm: (data: Partial<TListPost>) => void;
}

function QuickEditModal(props: IProps) {
  const { allCategories, allTags, data, loading, onClose, onConfirm } = props;

  const { t } = useTranslation();

  const [formData, setFormData] = useState<Partial<TListPost>>(data || {});

  const handleChange = useCallback(
    ({
      target: { name, value },
    }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setFormData({ ...formData, [name]: makeConfig(getConfig(value))(name) }),
    [formData],
  );

  const handleConfirm = useCallback(() => {
    onConfirm({
      id: data?.id,
      ...getObjectDiff(formData, data ?? {}),
    });
  }, [formData, data, onConfirm]);

  const handleAddTag = useCallback(
    (id: number) => {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), id],
      });
    },
    [formData],
  );

  const handleRemoveTag = useCallback(
    (id: number) => {
      setFormData({
        ...formData,
        tags: (formData.tags || []).filter((tagId) => tagId !== id),
      });
    },
    [formData],
  );

  const categoryOptions = useMemo(
    () =>
      formatOptions({
        options: allCategories,
        placeholder: t('selectCategory'),
      }),
    [allCategories, t],
  );

  const isSubmitDisabled =
    some([formData.title, formData.slug], isEmpty) || isEqual(formData, data);

  return (
    <DialogConfirm
      title={t('quickEdit')}
      onCancel={onClose}
      onConfirm={handleConfirm}
      confirmDisabled={isSubmitDisabled}
      cancelBtnTitle={t('cancel')}
      confirmBtnTitle={t('save')}
      loading={loading}
    >
      <form>
        <FormGroup>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder={t('enterTitle')}
            label={t('title')}
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder={t('enterSlug')}
            label={t('slug')}
            required
          />
        </FormGroup>
        {!isEmpty(allCategories) && (
          <FormGroup>
            <Select
              className="w-full"
              name="categories"
              value={formData.categories?.[0] ?? ''}
              onChange={handleChange}
              options={categoryOptions}
              label={t('category')}
              required
            />
          </FormGroup>
        )}
        <PostTagsManager
          allTags={allTags}
          postTags={formData?.tags ?? []}
          onAddTag={handleAddTag}
          onRemoveTag={handleRemoveTag}
        />
      </form>
    </DialogConfirm>
  );
}

export default QuickEditModal;
