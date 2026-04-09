import { useTranslation } from 'react-i18next';

import { DataTable, DataTableToolbar } from '@components/common';
import { BaseLayout, Content } from '@components/layout';

import {
  MEDIA_DEFAULT_QUERY_PARAMS,
  MEDIA_SORTING_CONFIG,
} from '@constants/_media';

import { useTitle, useUrlQueryParams } from '@hooks';

import { useListMedia, useRemoveMedia } from '@queries';

import { TListMediaQueryParams, TMedia } from '@types';

import { MediaHeader } from './components';
import { getColumns } from './media.config';

function MediaPage() {
  const { t } = useTranslation();
  useTitle(t('page.media'));

  const [queryParams, setQueryParams] = useUrlQueryParams(
    MEDIA_DEFAULT_QUERY_PARAMS,
  );

  const {
    data: { data, total, pages },
    isLoading,
    isFetching,
    refetch,
  } = useListMedia(queryParams);

  const { onRemoveMedia } = useRemoveMedia();

  const handleRemoveMedia = (id: number) =>
    // eslint-disable-next-line no-alert
    window.confirm(t('removeMediaConfirm', { id })) && onRemoveMedia(id);

  const columns = getColumns(t, handleRemoveMedia);

  return (
    <BaseLayout>
      <MediaHeader />
      <Content>
        <h2 className="mb-4">{t('page.media')}</h2>
        <DataTableToolbar<TListMediaQueryParams>
          onQueryParamsChange={setQueryParams}
          onRefresh={refetch}
          queryParams={queryParams}
          sortingConfig={MEDIA_SORTING_CONFIG}
        />
        <DataTable<TMedia>
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

export default MediaPage;
