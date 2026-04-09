import { useTranslation } from 'react-i18next';

import { DataTable, PageHeader } from '@components/common';
import { BaseLayout, Content } from '@components/layout';
import { Breadcrumbs } from '@components/ui';

import { COMMENTS_DEFAULT_QUERY_PARAMS, ROUTE } from '@constants';

import { useTitle, useUrlQueryParams } from '@hooks';

import { useCommentsData, useRemoveComment } from '@queries';

import { TComment, TCommentStatus } from '@types';

import { getColumns } from './comments.config';
import { CommentsTableToolbar } from './components';

function CommentsPage() {
  const { t } = useTranslation();
  useTitle(t('page.comments'));

  const [queryParams, setQueryParams] = useUrlQueryParams(
    COMMENTS_DEFAULT_QUERY_PARAMS,
  );

  const {
    data: { data, total, pages },
    refetch,
    isLoading,
    isFetching,
  } = useCommentsData(queryParams);

  const { removeCommentMutate } = useRemoveComment();

  const handleRemoveComment = (id: number, status: TCommentStatus) =>
    // eslint-disable-next-line no-alert
    window.confirm(t('removeCommentConfirm', { id })) &&
    removeCommentMutate({ id, status });

  const columns = getColumns(t, handleRemoveComment);

  return (
    <BaseLayout>
      <PageHeader>
        <Breadcrumbs
          links={[
            { label: t('page.home'), link: ROUTE.HOME },
            { label: t('page.comments') },
          ]}
        />
      </PageHeader>
      <Content>
        <h2 className="mb-4">{t('page.comments')}</h2>
        <CommentsTableToolbar
          onQueryParamsChange={setQueryParams}
          onRefresh={refetch}
          queryParams={queryParams}
        />
        <DataTable<TComment>
          columns={columns}
          currentPage={+queryParams.page}
          data={data}
          loading={isLoading || isFetching}
          onPageChange={setQueryParams}
          total={total}
          totalPages={pages}
        />
      </Content>
    </BaseLayout>
  );
}

export default CommentsPage;
