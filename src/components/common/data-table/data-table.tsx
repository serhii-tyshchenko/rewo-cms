import { useTranslation } from 'react-i18next';

import { isEmpty } from 'lodash-es';

import { EmptyState, Pagination, Table } from '@components/ui';

import { TTableColumnConfig, TTableData } from '@types';

import { DataStats } from '../data-stats';

interface IProps<T> {
  className?: string;
  columns: TTableColumnConfig<T>;
  currentPage: number;
  data: TTableData<T>[];
  loading?: boolean;
  onPageChange: (params: Record<string, any>) => void;
  total: number;
  totalPages: number;
}

function DataTable<T>(props: IProps<T>) {
  const {
    loading = false,
    data,
    columns,
    total,
    totalPages,
    currentPage,
    onPageChange,
    className = '',
  } = props;

  const { t } = useTranslation();

  const handlePageChange = (page: number) => onPageChange({ page });

  if (loading) {
    return <EmptyState>{t('loading')}</EmptyState>;
  }

  if (!loading && isEmpty(data)) {
    return <EmptyState>{t('noResultsFound')}</EmptyState>;
  }

  return (
    <>
      <div className="mb-4 overflow-y-auto pr-2">
        <Table data={data} columns={columns} className={className} />
      </div>
      <DataStats total={total} totalPages={totalPages} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageClick={handlePageChange}
      />
    </>
  );
}

export default DataTable;
