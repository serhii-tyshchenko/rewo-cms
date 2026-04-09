import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';

import { addTag, listTags, removeTag, updateTag } from '@api';

import { TAGS_DEFAULT_QUERY_PARAMS } from '@constants/_tags';

import {
  doAddErrorNotification,
  doAddSuccessNotification,
} from '@store/actions';

import { TListTagsData, TListTagsQueryParams, TTag } from '@types';

const LIST_TAGS_QUERY_KEY = 'list-tags';
const LIST_ALL_TAGS_QUERY_KEY = 'list-all-tags';

export const useAddTag = (closeModal: () => void) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { mutate: onAddTag, isLoading: isAdding } = useMutation(
    (newTag: Partial<TTag>) => addTag(newTag),
    {
      onSuccess: () => {
        closeModal();
        dispatch(doAddSuccessNotification('Tag added successfully'));
        queryClient.invalidateQueries(LIST_TAGS_QUERY_KEY);
      },
      onError: (error: string) => {
        dispatch(doAddErrorNotification(error || 'Failed to add tag'));
      },
    },
  );

  return { onAddTag, isAdding };
};

export const useListTags = (queryParams: TListTagsQueryParams) => {
  const dispatch = useDispatch();
  const { isLoading, data, refetch, isFetching } = useQuery(
    [LIST_TAGS_QUERY_KEY, queryParams],
    () => listTags(queryParams),
    {
      refetchOnWindowFocus: false,
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
    data: safeData as TListTagsData,
    refetch,
    isFetching,
  };
};

export const useListAllTags = () => {
  const dispatch = useDispatch();
  const { isLoading, data, refetch, isFetching } = useQuery(
    [LIST_ALL_TAGS_QUERY_KEY],
    () => listTags(TAGS_DEFAULT_QUERY_PARAMS),
    {
      refetchOnWindowFocus: false,
      onError: (error: string) => {
        dispatch(doAddErrorNotification(error));
      },
    },
  );
  const safeData = data?.data ?? [];
  return {
    data: safeData as TTag[],
    isLoading,
    refetch,
    isFetching,
  };
};

export const useUpdateTag = (cbSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { mutate: onUpdateTag, isLoading: isUpdating } = useMutation(
    (tag: Partial<TTag>) => updateTag(tag),
    {
      onSuccess: () => {
        cbSuccess?.();
        dispatch(doAddSuccessNotification('Tag updated successfully'));
        queryClient.invalidateQueries(LIST_TAGS_QUERY_KEY);
      },
      onError: (error: string) => {
        dispatch(doAddErrorNotification(error || 'Failed to update tag'));
      },
    },
  );

  return { onUpdateTag, isUpdating };
};

export const useRemoveTag = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { mutate: onRemoveTag } = useMutation((id: number) => removeTag(id), {
    onSuccess: () => {
      dispatch(doAddSuccessNotification('Tag removed successfully'));
      queryClient.invalidateQueries(LIST_TAGS_QUERY_KEY);
    },
    onError: (error: string) => {
      dispatch(doAddErrorNotification(error || 'Failed to remove tag'));
    },
  });

  return { onRemoveTag };
};
