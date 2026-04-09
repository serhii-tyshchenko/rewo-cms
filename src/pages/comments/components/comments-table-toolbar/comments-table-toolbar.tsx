import { useTranslation } from 'react-i18next';

import { DataTableToolbar } from '@components/common';
import { Select } from '@components/ui';

import { COMMENTS_SORTING_CONFIG } from '@constants';

import { TCommentStatus, TListCommentsQueryParams } from '@types';

interface IProps {
  onQueryParamsChange: (params: Record<string, any>) => void;
  onRefresh: () => void;
  queryParams: TListCommentsQueryParams;
}

const STATUS_VALUES: TCommentStatus[] = ['approve', 'hold', 'spam', 'trash'];

function CommentsTableToolbar(props: IProps) {
  const { onQueryParamsChange, onRefresh, queryParams } = props;
  const { t } = useTranslation();

  const handleStatusChange = (ev: React.ChangeEvent<HTMLSelectElement>) =>
    onQueryParamsChange({ [ev.target.name]: ev.target.value, page: 1 });

  const statusOptions = STATUS_VALUES.reduce(
    (acc, status) => {
      acc.push({
        label: t(`statuses.${status}`) || status,
        value: status,
        disabled: false,
      });
      return acc;
    },
    [{ label: t('selectStatus'), value: '', disabled: true }],
  );

  return (
    <DataTableToolbar<TListCommentsQueryParams>
      queryParams={queryParams}
      onQueryParamsChange={onQueryParamsChange}
      onRefresh={onRefresh}
      sortingConfig={COMMENTS_SORTING_CONFIG}
    >
      <Select
        name="status"
        options={statusOptions}
        onChange={handleStatusChange}
        value={queryParams.status}
        size="small"
        title={t('status')}
      />
    </DataTableToolbar>
  );
}

export default CommentsTableToolbar;
