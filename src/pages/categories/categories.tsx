import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DataTable } from '@components/common';
import { BaseLayout, Content } from '@components/layout';

import {
  CATEGORIES_DEFAULT_QUERY_PARAMS,
  CATEGORIES_SORTING_CONFIG,
} from '@constants/_categories';

import { useModals, useTitle, useUrlQueryParams } from '@hooks';

import {
  useAddCategory,
  useListCategories,
  useRemoveCategory,
  useUpdateCategory,
} from '@queries';

import { TCategory } from '@types';

import { getColumns } from './categories.config';
import {
  CategoriesHeader,
  CategoriesTableToolbar,
  CategoryModal,
} from './components';
import { type TCategoryAction } from './types';

function Categories() {
  const { t } = useTranslation();

  useTitle(t('page.categories'));

  const {
    modal: activeModal,
    openModal,
    closeModal,
  } = useModals<TCategoryAction>();

  const [queryParams, setQueryParams] = useUrlQueryParams(
    CATEGORIES_DEFAULT_QUERY_PARAMS,
  );

  const { onAddCategory, isAdding } = useAddCategory(closeModal);
  const {
    data: { data, total, pages },
    refetch,
    isLoading,
  } = useListCategories(queryParams);
  const { onUpdateCategory, isUpdating } = useUpdateCategory(closeModal);
  const { onRemoveCategory } = useRemoveCategory();

  const [activeCategory, setActiveCategory] = useState<TCategory | undefined>(
    undefined,
  );

  const handleActionClick = (row: TCategory, action: TCategoryAction) => {
    setActiveCategory(row);
    switch (action) {
      case 'clone':
        openModal('clone');
        break;
      case 'edit':
        openModal('edit');
        break;
      case 'delete':
        // eslint-disable-next-line no-alert
        if (window.confirm(t('removeCategoryConfirm', { name: row.name }))) {
          onRemoveCategory(row.id);
        }
        break;
      default:
        break;
    }
  };

  const columns = getColumns(t, handleActionClick);

  return (
    <BaseLayout>
      <CategoriesHeader onAddCategoryClick={() => openModal('add')} />
      <Content>
        <h2 className="mb-4">{t('page.categories')}</h2>
        <CategoriesTableToolbar
          onQueryParamsChange={setQueryParams}
          onRefresh={refetch}
          queryParams={queryParams}
          sortingConfig={CATEGORIES_SORTING_CONFIG}
        />
        <DataTable<TCategory>
          columns={columns}
          className="table-left-col-2"
          currentPage={+queryParams.page}
          data={data}
          loading={isLoading}
          onPageChange={setQueryParams}
          total={total}
          totalPages={pages}
        />
      </Content>
      {activeModal === 'edit' && (
        <CategoryModal
          mode="edit"
          onClose={closeModal}
          onConfirm={onUpdateCategory}
          data={activeCategory}
          loading={isUpdating}
        />
      )}
      {activeModal === 'add' && (
        <CategoryModal
          mode="add"
          onClose={closeModal}
          onConfirm={onAddCategory}
          loading={isAdding}
        />
      )}
    </BaseLayout>
  );
}

export default Categories;
