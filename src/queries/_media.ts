import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';

import { listMedia, removeMedia, retrieveMedia } from '@api';

import {
  doAddErrorNotification,
  doAddSuccessNotification,
} from '@store/actions';

import { TListMediaData, TListMediaQueryParams } from '@types';

import { validateId } from '@utils';

const LIST_MEDIA_QUERY_KEY = 'list-media';
const RETRIEVE_MEDIA_QUERY_KEY = 'retrieve-media';

export const useListMedia = (queryParams: TListMediaQueryParams) => {
  const dispatch = useDispatch();
  const {
    isLoading,
    data = [],
    refetch,
    isFetching,
  } = useQuery(
    [LIST_MEDIA_QUERY_KEY, queryParams],
    () => listMedia(queryParams),
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
    data: safeData as TListMediaData,
    refetch,
    isFetching,
  };
};

export const useRetrieveMedia = (id: number) => {
  const validId = validateId(id);
  const dispatch = useDispatch();
  const { isLoading, data, refetch, isFetching, error } = useQuery(
    [RETRIEVE_MEDIA_QUERY_KEY, id],
    () => (validId ? retrieveMedia(id) : undefined),
    {
      enabled: validId,
      refetchOnWindowFocus: false,
      onError: (err: string) => {
        dispatch(doAddErrorNotification(err));
      },
    },
  );

  return {
    isLoading,
    data,
    refetch,
    isFetching,
    error,
  };
};

export const useRemoveMedia = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { mutate: onRemoveMedia } = useMutation(
    (id: number) => removeMedia(id),
    {
      onSuccess: () => {
        dispatch(doAddSuccessNotification('Media removed successfully'));
        queryClient.invalidateQueries(LIST_MEDIA_QUERY_KEY);
      },
      onError: (error: string) => {
        dispatch(doAddErrorNotification(error));
      },
    },
  );

  return { onRemoveMedia };
};
