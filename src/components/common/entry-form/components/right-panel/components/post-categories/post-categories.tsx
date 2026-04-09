import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { first } from 'lodash-es';

import { FormGroup, Select } from '@components/ui';

import { TCategory } from '@types';

import { formatOptions } from '@utils';

interface IProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  postCategories: number[];
  allCategories: TCategory[];
}

function PostCategories(props: IProps) {
  const { onChange, postCategories, allCategories } = props;
  const { t } = useTranslation();

  const categoryId = first(postCategories) ?? 0;

  const categoryOptions = useMemo(
    () =>
      formatOptions({
        options: allCategories,
        placeholder: t('selectCategory'),
      }),
    [allCategories, t],
  );
  const categoryName = useMemo(
    () => allCategories.find(({ id }: TCategory) => id === categoryId)?.name,
    [allCategories, categoryId],
  );

  return (
    <FormGroup>
      <Select
        className="w-full"
        label={t('category')}
        name="categories"
        onChange={onChange}
        options={categoryOptions}
        required
        title={categoryName}
        value={categoryId}
      />
    </FormGroup>
  );
}

export default PostCategories;
