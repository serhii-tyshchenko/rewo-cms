/* eslint-disable no-console */
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import {
  addPost,
  listPosts,
  patchPost,
  removePost,
  removePosts,
  retrievePost,
  retrievePostMetaFields,
  updatePost,
} from '@api';

import { toast } from '@services/notification-store';

import { TListPostsData, TListPostsQueryParams, TPost } from '@types';

import { validateId } from '@utils';

const LIST_POSTS_QUERY_KEY = 'list-posts';
const RETRIEVE_POST_QUERY_KEY = 'retrieve-post';
const RETRIEVE_POST_META_FIELDS_QUERY_KEY = 'retrieve-post-meta-fields';

export const useAddPost = () => {
  const { t } = useTranslation();

  const { mutate: onAddPost, isLoading: isAdding } = useMutation(
    (data) => addPost(data),
    {
      onSuccess: (response) => {
        toast.success(t('postAddedSuccess', { link: response.link }));
      },
      onError: (error: string) => {
        toast.error(t('postAddedError'));
        console.error(error);
      },
    },
  );

  return { onAddPost, isAdding };
};

export const useListPosts = (queryParams: TListPostsQueryParams) => {
  const { t } = useTranslation();

  const {
    isLoading,
    data = [],
    refetch,
    isFetching,
  } = useQuery(
    [LIST_POSTS_QUERY_KEY, queryParams],
    () => listPosts(queryParams),
    {
      refetchOnWindowFocus: false,
      onError: (error: string) => {
        toast.error(t('listPostsError'));
        console.error(error);
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
    data: safeData as TListPostsData,
    refetch,
    isFetching,
  };
};

export const useRetrievePost = (id: number) => {
  const { t } = useTranslation();

  const validId = validateId(id);
  const { isLoading, data, refetch, isFetching, dataUpdatedAt } = useQuery(
    [RETRIEVE_POST_QUERY_KEY, id],
    () => (validId ? retrievePost(id) : undefined),
    {
      enabled: validId,
      refetchOnWindowFocus: false,
      onError: (error: string) => {
        toast.error(t('retrievePostError'));
        console.error(error);
      },
    },
  );

  return {
    isLoading,
    data,
    refetch,
    isFetching,
    dataUpdatedAt,
  };
};

export const useRetrievePostMetaFields = () => {
  const { t } = useTranslation();

  const { isLoading, data, refetch, isFetching } = useQuery(
    [RETRIEVE_POST_META_FIELDS_QUERY_KEY],
    () => retrievePostMetaFields(),
    {
      refetchOnWindowFocus: false,
      onError: (error: string) => {
        toast.error(t('retrievePostMetaFieldsError'));
        console.error(error);
      },
    },
  );

  return {
    isLoading,
    data,
    refetch,
    isFetching,
  };
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate: onUpdatePost, isLoading: isUpdating } = useMutation(
    (data) => updatePost(data),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(RETRIEVE_POST_QUERY_KEY);
        toast.success(t('updatePostSuccess'));
      },
      onError: (error: string) => {
        toast.error(t('updatePostError'));
        console.error(error);
      },
    },
  );

  return { onUpdatePost, isUpdating };
};

export const useQuickUpdatePost = (cbSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate: onUpdate, isLoading: isUpdating } = useMutation(
    (data: Partial<TPost>) => patchPost(data),
    {
      onSuccess: async () => {
        cbSuccess?.();
        await queryClient.invalidateQueries(LIST_POSTS_QUERY_KEY);
        toast.success(t('updatePostSuccess'));
      },
      onError: (error: string) => {
        toast.error(t('updatePostError'));
        console.error(error);
      },
    },
  );

  return { onUpdate, isUpdating };
};

export const useRemovePost = (withRefetch = false) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutateAsync: onRemovePost, isLoading } = useMutation(
    ({ id, force }: { id: number; force: boolean }) => removePost(id, force),
    {
      onSuccess: () => {
        toast.success(t('removePostSuccess'));
        if (withRefetch) {
          queryClient.invalidateQueries(LIST_POSTS_QUERY_KEY);
        }
      },
      onError: (error: string) => {
        toast.error(t('removePostError'));
        console.error(error);
      },
    },
  );

  return { onRemovePost, isRemoving: isLoading };
};

export const useRemovePostWithRefetch = () => useRemovePost(true);

export const useRemovePosts = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutateAsync: onRemovePosts, isLoading } = useMutation(
    (selectedItems: { id: number; force: boolean }[]) =>
      removePosts(selectedItems),
    {
      onSuccess: () => {
        toast.success(t('removePostsSuccess'));
        queryClient.invalidateQueries(LIST_POSTS_QUERY_KEY);
      },
      onError: (error: string) => {
        toast.error(t('removePostsError'));
        console.error(error);
      },
    },
  );

  return { onRemovePosts, isRemoving: isLoading };
};
