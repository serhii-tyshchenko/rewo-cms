import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { isEmpty } from 'lodash-es';

import { DataTable } from '@components/common';
import { BaseLayout, Content } from '@components/layout';
import { IconButton } from '@components/ui';

import {
  BATCH_ENTRIES_LIMIT,
  CATEGORIES_DEFAULT_QUERY_PARAMS,
} from '@constants';
import {
  POSTS_DEFAULT_QUERY_PARAMS,
  POSTS_SORTING_CONFIG,
} from '@constants/_posts';

import {
  useStateWithReset,
  useTitle,
  useToggle,
  useUrlQueryParams,
} from '@hooks';

import {
  useListAllTags,
  useListCategories,
  useListPosts,
  useQuickUpdatePost,
  useRemovePostWithRefetch,
  useRemovePosts,
} from '@queries';

import { TListPost } from '@types';

import { isPostDeleted } from '@utils';

import { PostsHeader, PostsTableToolbar, QuickEditModal } from './components';
import { getColumns } from './posts.config';

function Posts() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const [queryParams, setQueryParams] = useUrlQueryParams(
    POSTS_DEFAULT_QUERY_PARAMS,
  );

  const { data: allTags } = useListAllTags();
  const { data: categories } = useListCategories(
    CATEGORIES_DEFAULT_QUERY_PARAMS,
  );

  const {
    data: { data, total, pages },
    isLoading,
    isFetching,
    refetch,
  } = useListPosts(queryParams);
  const { onRemovePost } = useRemovePostWithRefetch();
  const { onRemovePosts } = useRemovePosts();

  const [isQuickEditModalOpen, toggleQuickEditModal] = useToggle();
  const [selectedRows, setSelectedRows, resetSelectedRows] = useStateWithReset<
    TListPost[]
  >([]);
  const [selectedPost, setSelectedPost] = useState<TListPost | undefined>(
    undefined,
  );

  const { onUpdate: onQuickUpdate, isUpdating: isQuickUpdating } =
    useQuickUpdatePost(toggleQuickEditModal);

  const categoryName = categories.data.find(
    (cat) => cat.id === Number(queryParams?.categories),
  )?.name;

  useTitle(`${t('page.posts')} - ${categoryName ?? t('allCategories')}`);

  const handleQuickEditPost = (post: TListPost) => {
    setSelectedPost(post);
    toggleQuickEditModal();
  };

  const handleRemovePost = useCallback(
    ({ id, title, status }: TListPost) => {
      // eslint-disable-next-line no-alert
      if (window.confirm(t('removePostConfirm', { title }))) {
        onRemovePost({ id, force: isPostDeleted(status) });
      }
    },
    [dispatch, data],
  );

  const onSelectRow = (newRow: TListPost) => {
    if (selectedRows.some((item) => item.id === newRow.id)) {
      setSelectedRows((prev) => prev?.filter((item) => item.id !== newRow.id));
    } else {
      setSelectedRows((prev) => [...prev, newRow]);
    }
  };

  const onToggleAll = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (ev.target.checked) {
      setSelectedRows(data);
    } else {
      resetSelectedRows();
    }
  };

  const handleBulkRemove = async () => {
    if (
      // eslint-disable-next-line no-alert
      !window.confirm(
        t('removeSelectedConfirm', { count: selectedRows.length }),
      )
    )
      return;
    try {
      const rowsForRemoval = selectedRows.map((row) => ({
        id: row.id,
        force: isPostDeleted(row.status),
      }));
      await onRemovePosts(rowsForRemoval);
      resetSelectedRows();
    } catch (_err) {
      throw new Error('Failed to remove posts');
    }
  };

  const isSelectionDisabled = selectedRows.length > BATCH_ENTRIES_LIMIT;

  const columns = getColumns({
    allTags,
    entries: data,
    selectedRows,
    onRemovePost: handleRemovePost,
    onQuickEditPost: handleQuickEditPost,
    onToggleAll,
    onSelectRow,
    t,
    isSelectionDisabled,
  });
  const souldDisableBulkAction = isEmpty(selectedRows) || isSelectionDisabled;

  return (
    <BaseLayout>
      <PostsHeader />
      <Content>
        <h2 className="mb-4">{t('page.posts')}</h2>
        <PostsTableToolbar
          queryParams={queryParams}
          onQueryParamsChange={setQueryParams}
          onRefresh={refetch}
          categories={categories.data}
          sortingConfig={POSTS_SORTING_CONFIG}
          tags={allTags}
        />
        <div className="flex items-center mb-4 gap-2">
          <IconButton
            icon="cancel"
            onClick={resetSelectedRows}
            title={t('clearSelection')}
            disabled={souldDisableBulkAction}
          />
          <IconButton
            icon="trash"
            onClick={handleBulkRemove}
            title={t('removeSelected')}
            disabled={souldDisableBulkAction}
            className="mr-1"
          />
        </div>
        <DataTable<TListPost>
          data={data}
          columns={columns}
          className="table-left-col-3"
          loading={isLoading || isFetching}
          currentPage={+queryParams.page}
          onPageChange={setQueryParams}
          total={total}
          totalPages={pages}
        />
      </Content>
      {isQuickEditModalOpen && (
        <QuickEditModal
          allCategories={categories.data}
          allTags={allTags}
          data={selectedPost}
          loading={isQuickUpdating}
          onClose={toggleQuickEditModal}
          onConfirm={onQuickUpdate}
        />
      )}
    </BaseLayout>
  );
}

export default Posts;
