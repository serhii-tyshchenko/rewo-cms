/* eslint-disable no-console */
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';

import {
  addPost,
  listPosts,
  patchPost,
  removePost,
  removePosts,
  retrievePost,
  updatePost,
} from '@api';

import {
  doAddErrorNotification,
  doAddSuccessNotification,
} from '@store/actions';

import { TListPostsData, TListPostsQueryParams, TPost } from '@types';

import { validateId } from '@utils';

const LIST_POSTS_QUERY_KEY = 'list-posts';
const RETRIEVE_POST_QUERY_KEY = 'retrieve-post';

export const useAddPost = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { mutate: onAddPost, isLoading: isAdding } = useMutation(
    (data) => addPost(data),
    {
      onSuccess: (response) => {
        dispatch(
          doAddSuccessNotification(
            t('postAddedSuccess', { link: response.link }),
          ),
        );
      },
      onError: (error: string) => {
        dispatch(doAddErrorNotification(t('postAddedError')));
        console.error(error);
      },
    },
  );

  return { onAddPost, isAdding };
};

export const useListPosts = (queryParams: TListPostsQueryParams) => {
  const dispatch = useDispatch();
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
        dispatch(doAddErrorNotification(t('listPostsError')));
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
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const validId = validateId(id);
  const { isLoading, data, refetch, isFetching, dataUpdatedAt } = useQuery(
    [RETRIEVE_POST_QUERY_KEY, id],
    () => (validId ? retrievePost(id) : undefined),
    {
      enabled: validId,
      refetchOnWindowFocus: false,
      onError: (error: string) => {
        dispatch(doAddErrorNotification(t('retrievePostError')));
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

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { mutate: onUpdatePost, isLoading: isUpdating } = useMutation(
    (data) => updatePost(data),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(RETRIEVE_POST_QUERY_KEY);
        dispatch(doAddSuccessNotification(t('updatePostSuccess')));
      },
      onError: (error: string) => {
        dispatch(doAddErrorNotification(t('updatePostError')));
        console.error(error);
      },
    },
  );

  return { onUpdatePost, isUpdating };
};

export const useQuickUpdatePost = (cbSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { mutate: onUpdate, isLoading: isUpdating } = useMutation(
    (data: Partial<TPost>) => patchPost(data),
    {
      onSuccess: async () => {
        cbSuccess?.();
        await queryClient.invalidateQueries(LIST_POSTS_QUERY_KEY);
        dispatch(doAddSuccessNotification(t('updatePostSuccess')));
      },
      onError: (error: string) => {
        dispatch(doAddErrorNotification(t('updatePostError')));
        console.error(error);
      },
    },
  );

  return { onUpdate, isUpdating };
};

export const useRemovePost = (withRefetch = false) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { mutateAsync: onRemovePost, isLoading } = useMutation(
    ({ id, force }: { id: number; force: boolean }) => removePost(id, force),
    {
      onSuccess: () => {
        dispatch(doAddSuccessNotification(t('removePostSuccess')));
        if (withRefetch) {
          queryClient.invalidateQueries(LIST_POSTS_QUERY_KEY);
        }
      },
      onError: (error: string) => {
        dispatch(doAddErrorNotification(t('removePostError')));
        console.error(error);
      },
    },
  );

  return { onRemovePost, isRemoving: isLoading };
};

export const useRemovePostWithRefetch = () => useRemovePost(true);

export const useRemovePosts = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { mutateAsync: onRemovePosts, isLoading } = useMutation(
    (selectedItems: { id: number; force: boolean }[]) =>
      removePosts(selectedItems),
    {
      onSuccess: () => {
        dispatch(doAddSuccessNotification(t('removePostsSuccess')));
        queryClient.invalidateQueries(LIST_POSTS_QUERY_KEY);
      },
      onError: (error: string) => {
        dispatch(doAddErrorNotification(t('removePostsError')));
        console.error(error);
      },
    },
  );

  return { onRemovePosts, isRemoving: isLoading };
};
