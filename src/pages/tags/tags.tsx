import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DataTable, DataTableToolbar } from '@components/common';
import { BaseLayout, Content } from '@components/layout';

import {
  TAGS_DEFAULT_QUERY_PARAMS,
  TAGS_SORTING_CONFIG,
  TAG_ACTION,
  TAG_MODAL_TYPE,
} from '@constants/_tags';

import { useModals, useTitle, useUrlQueryParams } from '@hooks';

import { useAddTag, useListTags, useRemoveTag, useUpdateTag } from '@queries';

import { TListTagsQueryParams, TTag } from '@types';

import { TagModal, TagsHeader } from './components';
import { getColumns } from './tags.config';

function TagsPage() {
  const { t } = useTranslation();
  useTitle(t('page.tags'));

  const [queryParams, setQueryParams] = useUrlQueryParams(
    TAGS_DEFAULT_QUERY_PARAMS,
  );
  const { modal: activeModal, openModal, closeModal } = useModals();
  const [selectedTag, setSelectedTag] = useState<TTag | undefined>(undefined);

  const { onAddTag, isAdding } = useAddTag(closeModal);

  const {
    data: { data, total, pages },
    isLoading,
    isFetching,
    refetch,
  } = useListTags(queryParams);

  const { onUpdateTag, isUpdating } = useUpdateTag(closeModal);

  const { onRemoveTag } = useRemoveTag();

  const handleRowAction = (rowData: TTag, action: string) => {
    setSelectedTag(rowData);
    switch (action) {
      case TAG_ACTION.EDIT:
        openModal(TAG_MODAL_TYPE.EDIT_TAG);
        break;
      case TAG_ACTION.REMOVE: {
        if (
          // eslint-disable-next-line no-alert
          window.confirm(t('removeTagConfirm', { name: rowData.name }))
        ) {
          onRemoveTag(rowData.id);
        }
        break;
      }
      default:
        break;
    }
  };

  const columns = getColumns(t, handleRowAction);

  return (
    <BaseLayout>
      <TagsHeader onAddTagClick={() => openModal(TAG_MODAL_TYPE.ADD_TAG)} />
      <Content>
        <h2 className="mb-4">{t('page.tags')}</h2>
        <DataTableToolbar<TListTagsQueryParams>
          onQueryParamsChange={setQueryParams}
          onRefresh={refetch}
          queryParams={queryParams}
          sortingConfig={TAGS_SORTING_CONFIG}
        />
        <DataTable<TTag>
          loading={isLoading || isFetching}
          data={data}
          columns={columns}
          total={total}
          totalPages={pages}
          currentPage={+queryParams.page}
          onPageChange={setQueryParams}
          className="table-left-col-2"
        />
      </Content>
      {activeModal === TAG_MODAL_TYPE.ADD_TAG && (
        <TagModal
          onClose={closeModal}
          onConfirm={onAddTag}
          loading={isAdding}
          mode="add"
        />
      )}
      {activeModal === TAG_MODAL_TYPE.EDIT_TAG && (
        <TagModal
          onClose={closeModal}
          onConfirm={onUpdateTag}
          data={selectedTag}
          loading={isUpdating}
          mode="edit"
        />
      )}
    </BaseLayout>
  );
}

export default TagsPage;
