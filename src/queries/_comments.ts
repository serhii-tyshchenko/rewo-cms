import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';

import { listComments, removeComment } from '@api';

import {
  doAddErrorNotification,
  doAddSuccessNotification,
} from '@store/actions';

import {
  TCommentStatus,
  TListCommentsData,
  TListCommentsQueryParams,
} from '@types';

const LIST_QUERY_KEY = 'list-comments';

export const useCommentsData = (queryParams: TListCommentsQueryParams) => {
  const dispatch = useDispatch();
  const {
    isLoading,
    data = [],
    refetch,
    isFetching,
  } = useQuery([LIST_QUERY_KEY, queryParams], () => listComments(queryParams), {
    refetchOnWindowFocus: false,
    onError: (error: string) => {
      dispatch(doAddErrorNotification(error || 'Error fetching comments'));
    },
  });
  const safeData = data ?? {
    data: [],
    total: 0,
    pages: 0,
  };

  return {
    isLoading,
    data: safeData as TListCommentsData,
    refetch,
    isFetching,
  };
};

export const useRemoveComment = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { mutate: removeCommentMutate } = useMutation(
    ({ id, status }: { id: number; status: TCommentStatus }) =>
      removeComment(id, status),
    {
      onSuccess: () => {
        dispatch(doAddSuccessNotification('Comment removed successfully'));
        queryClient.invalidateQueries(LIST_QUERY_KEY);
      },
      onError: (error: string) => {
        dispatch(doAddErrorNotification(error || 'Error removing comment'));
      },
    },
  );

  return { removeCommentMutate };
};
