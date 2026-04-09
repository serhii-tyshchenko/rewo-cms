import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { isEmpty } from 'lodash-es';

import { DataTableToolbar } from '@components/common';
import { Select } from '@components/ui';

import { TCategory, TListPostsQueryParams, TTag } from '@types';

import { formatOptions } from '@utils';

interface IProps {
  onRefresh: () => void;
  queryParams: TListPostsQueryParams;
  onQueryParamsChange: (params: TListPostsQueryParams) => void;
  categories: TCategory[];
  sortingConfig: string[];
  tags: TTag[];
}

function PostsTableToolbar(props: IProps) {
  const {
    queryParams,
    onQueryParamsChange,
    categories,
    tags,
    onRefresh,
    sortingConfig,
  } = props;

  const { t } = useTranslation();

  const handleParameterChange = (ev: React.ChangeEvent<HTMLSelectElement>) =>
    onQueryParamsChange({
      [ev.target.name]: ev.target.value,
      page: 1,
      per_page: queryParams.per_page ?? 50,
    });

  const categoriesOptions = useMemo(
    () => [
      { value: '', label: t('allCategories') },
      ...formatOptions({
        options: categories,
      }),
    ],
    [categories, t],
  );

  const statusOptions = useMemo(
    () => [
      {
        value: 'publish,pending,draft,trash,future,private',
        label: t('allStatuses'),
      },
      { value: 'publish', label: t('postStatuses.publish') },
      { value: 'future', label: t('postStatuses.future') },
      { value: 'draft', label: t('postStatuses.draft') },
      { value: 'pending', label: t('postStatuses.pending') },
      { value: 'private', label: t('postStatuses.private') },
      { value: 'trash', label: t('postStatuses.trash') },
    ],
    [t],
  );

  const tagOptions = useMemo(
    () => [
      {
        value: '',
        label: t('allTags'),
      },
      ...formatOptions({
        options: tags,
        withTitle: true,
      }),
    ],
    [tags, t],
  );

  return (
    <DataTableToolbar<TListPostsQueryParams>
      queryParams={queryParams}
      onQueryParamsChange={onQueryParamsChange}
      onRefresh={onRefresh}
      sortingConfig={sortingConfig}
    >
      <Select
        name="categories"
        title={t('category')}
        options={categoriesOptions}
        onChange={handleParameterChange}
        value={queryParams.categories}
        disabled={isEmpty(categories)}
        style={{ width: '300px' }}
        size="small"
      />
      <Select
        name="status"
        title={t('selectStatus')}
        options={statusOptions}
        onChange={handleParameterChange}
        value={queryParams.status ?? 'publish'}
        size="small"
      />
      <Select
        name="tags"
        title={t('selectTag')}
        options={tagOptions}
        onChange={handleParameterChange}
        value={queryParams?.tags ?? ''}
        size="small"
      />
    </DataTableToolbar>
  );
}

export default PostsTableToolbar;
