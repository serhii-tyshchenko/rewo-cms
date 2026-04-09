/* eslint-disable no-console */
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';

import { omit } from 'lodash-es';

import {
  createCategory,
  listCategories,
  listCategoriesByParentId,
  removeCategory,
  updateCategory,
} from '@api';

import {
  doAddErrorNotification,
  doAddSuccessNotification,
} from '@store/actions';

import {
  TCategory,
  TListCategoriesData,
  TListCategoriesQueryParams,
} from '@types';

import { validateId } from '@utils';

const LIST_CATEGORIES_QUERY_KEY = 'list-categories';
const LIST_CATEGORIES_BY_PARENT_ID_KEY = 'list-categories-by-parent-id';

export const useAddCategory = (closeModal: () => void) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { mutate: onAddCategory, isLoading: isAdding } = useMutation(
    (data: Partial<TCategory>) =>
      createCategory(omit(data, ['id', 'count', 'link'])),
    {
      onSuccess: () => {
        closeModal();
        dispatch(doAddSuccessNotification(t('categoryAddedSuccessfully')));
        queryClient.invalidateQueries(LIST_CATEGORIES_QUERY_KEY);
      },
      onError: (err: string) => {
        dispatch(doAddErrorNotification(t('failedToAddCategory')));
        console.error(err);
      },
    },
  );

  return { onAddCategory, isAdding };
};

export const useListCategories = (queryParams: TListCategoriesQueryParams) => {
  const dispatch = useDispatch();
  const { isLoading, data, refetch, isFetching } = useQuery(
    [LIST_CATEGORIES_QUERY_KEY, queryParams],
    () => listCategories(queryParams),
    {
      refetchOnWindowFocus: false,
      onError: (err: string) => {
        dispatch(doAddErrorNotification(err));
      },
    },
  );
  const safeData = data ?? {
    data: [],
    total: 0,
    pages: 0,
  };
  return {
    isLoading,
    data: safeData as TListCategoriesData,
    refetch,
    isFetching,
  };
};

export const useListCategoriesByParentId = (parentId: number) => {
  const validId = validateId(parentId);
  const dispatch = useDispatch();
  const { isLoading, data } = useQuery(
    [LIST_CATEGORIES_BY_PARENT_ID_KEY, parentId],
    () => (validId ? listCategoriesByParentId(parentId) : undefined),
    {
      refetchOnWindowFocus: false,
      enabled: validId,
      onError: (error: string) => {
        dispatch(doAddErrorNotification(error));
      },
    },
  );

  const safeData = data ?? {
    data: [],
    total: 0,
    pages: 0,
  };

  return {
    isLoading,
    data: safeData as TListCategoriesData,
  };
};

export const useUpdateCategory = (closeModal: () => void) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { mutate: onUpdateCategory, isLoading: isUpdating } = useMutation(
    (data: Partial<TCategory>) => updateCategory(data.id, omit(data, 'id')),
    {
      onSuccess: () => {
        closeModal();
        dispatch(doAddSuccessNotification(t('categoryUpdatedSuccessfully')));
        queryClient.invalidateQueries(LIST_CATEGORIES_QUERY_KEY);
      },
      onError: (error: string) => {
        dispatch(doAddErrorNotification(t('failedToUpdateCategory')));
        console.error(error);
      },
    },
  );

  return { onUpdateCategory, isUpdating };
};

export const useRemoveCategory = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { mutate: onRemoveCategory } = useMutation(
    (id: number) => removeCategory(id),
    {
      onSuccess: () => {
        dispatch(doAddSuccessNotification(t('categoryRemovedSuccessfully')));
        queryClient.invalidateQueries(LIST_CATEGORIES_QUERY_KEY);
      },
      onError: (error: string) => {
        dispatch(doAddErrorNotification(error || t('failedToRemoveCategory')));
        console.error(error);
      },
    },
  );

  return { onRemoveCategory };
};
