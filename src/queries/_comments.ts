import { useMutation, useQuery, useQueryClient } from 'react-query';

import { listComments, removeComment } from '@api';

import { toast } from '@services/notification-store';

import {
  TCommentStatus,
  TListCommentsData,
  TListCommentsQueryParams,
} from '@types';

const LIST_QUERY_KEY = 'list-comments';

export const useCommentsData = (queryParams: TListCommentsQueryParams) => {
  const {
    isLoading,
    data = [],
    refetch,
    isFetching,
  } = useQuery([LIST_QUERY_KEY, queryParams], () => listComments(queryParams), {
    refetchOnWindowFocus: false,
    onError: (error: string) => {
      // TODO: Use i18n for this message
      toast.error(error || 'Error fetching comments');
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

  const { mutate: removeCommentMutate } = useMutation(
    ({ id, status }: { id: number; status: TCommentStatus }) =>
      removeComment(id, status),
    {
      onSuccess: () => {
        // TODO: Use i18n for this message
        toast.success('Comment removed successfully');
        queryClient.invalidateQueries(LIST_QUERY_KEY);
      },
      onError: (error: string) => {
        // TODO: Use i18n for this message
        toast.error(error || 'Error removing comment');
      },
    },
  );

  return { removeCommentMutate };
};
