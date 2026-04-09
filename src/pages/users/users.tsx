import { useTranslation } from 'react-i18next';

import { DataTable, DataTableToolbar, PageHeader } from '@components/common';
import { BaseLayout, Content } from '@components/layout';
import { Breadcrumbs } from '@components/ui';

import {
  ROUTE,
  USERS_DEFAULT_QUERY_PARAMS,
  USERS_SORTING_CONFIG,
} from '@constants';

import { useTitle, useUrlQueryParams } from '@hooks';

import { useListUsers } from '@queries';

import { TListUsersQueryParams, TUser } from '@types';

import { getColumns } from './users.config';

function UsersPage() {
  const { t } = useTranslation();
  useTitle(t('page.users'));

  const [queryParams, setQueryParams] = useUrlQueryParams(
    USERS_DEFAULT_QUERY_PARAMS,
  );

  const {
    data: { data, total, pages },
    isLoading,
    isFetching,
    refetch,
  } = useListUsers(queryParams);

  const columns = getColumns(t);

  return (
    <BaseLayout>
      <PageHeader>
        <Breadcrumbs
          links={[
            { label: t('page.home'), link: ROUTE.HOME },
            { label: t('page.users') },
          ]}
        />
      </PageHeader>
      <Content>
        <h2 className="mb-4">{t('page.users')}</h2>
        <DataTableToolbar<TListUsersQueryParams>
          onQueryParamsChange={setQueryParams}
          onRefresh={refetch}
          queryParams={queryParams}
          sortingConfig={USERS_SORTING_CONFIG}
        />
        <DataTable<TUser>
          columns={columns}
          data={data}
          loading={isLoading || isFetching}
          total={total}
          totalPages={pages}
          currentPage={+queryParams.page}
          onPageChange={setQueryParams}
        />
      </Content>
    </BaseLayout>
  );
}

export default UsersPage;
