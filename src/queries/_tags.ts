import { useMutation, useQuery, useQueryClient } from 'react-query';

import { addTag, listTags, removeTag, updateTag } from '@api';

import { TAGS_DEFAULT_QUERY_PARAMS } from '@constants/_tags';

import { toast } from '@services/notification-store';

import { TListTagsData, TListTagsQueryParams, TTag } from '@types';

const LIST_TAGS_QUERY_KEY = 'list-tags';
const LIST_ALL_TAGS_QUERY_KEY = 'list-all-tags';

export const useAddTag = (closeModal: () => void) => {
  const queryClient = useQueryClient();

  const { mutate: onAddTag, isLoading: isAdding } = useMutation(
    (newTag: Partial<TTag>) => addTag(newTag),
    {
      onSuccess: () => {
        closeModal();
        // TODO: Use i18n for this message
        toast.success('Tag added successfully');
        queryClient.invalidateQueries(LIST_TAGS_QUERY_KEY);
      },
      onError: (error: string) => {
        toast.error(error || 'Failed to add tag');
      },
    },
  );

  return { onAddTag, isAdding };
};

export const useListTags = (queryParams: TListTagsQueryParams) => {
  const { isLoading, data, refetch, isFetching } = useQuery(
    [LIST_TAGS_QUERY_KEY, queryParams],
    () => listTags(queryParams),
    {
      refetchOnWindowFocus: false,
      onError: (error: string) => {
        toast.error(error || 'Error fetching tags');
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
  const { isLoading, data, refetch, isFetching } = useQuery(
    [LIST_ALL_TAGS_QUERY_KEY],
    () => listTags(TAGS_DEFAULT_QUERY_PARAMS),
    {
      refetchOnWindowFocus: false,
      onError: (error: string) => {
        toast.error(error || 'Error fetching tags');
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

  const { mutate: onUpdateTag, isLoading: isUpdating } = useMutation(
    (tag: Partial<TTag>) => updateTag(tag),
    {
      onSuccess: () => {
        cbSuccess?.();
        // TODO: Use i18n for this message
        toast.success('Tag updated successfully');
        queryClient.invalidateQueries(LIST_TAGS_QUERY_KEY);
      },
      onError: (error: string) => {
        // TODO: Use i18n for this message
        toast.error(error || 'Failed to update tag');
      },
    },
  );

  return { onUpdateTag, isUpdating };
};

export const useRemoveTag = () => {
  const queryClient = useQueryClient();

  const { mutate: onRemoveTag } = useMutation((id: number) => removeTag(id), {
    onSuccess: () => {
      // TODO: Use i18n for this message
      toast.success('Tag removed successfully');
      queryClient.invalidateQueries(LIST_TAGS_QUERY_KEY);
    },
    onError: (error: string) => {
      // TODO: Use i18n for this message
      toast.error(error || 'Failed to remove tag');
    },
  });

  return { onRemoveTag };
};
