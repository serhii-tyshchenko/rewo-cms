import { useMutation, useQuery, useQueryClient } from 'react-query';

import { listMedia, removeMedia, retrieveMedia } from '@api';

import { toast } from '@services/notification-store';

import { TListMediaData, TListMediaQueryParams } from '@types';

import { validateId } from '@utils';

const LIST_MEDIA_QUERY_KEY = 'list-media';
const RETRIEVE_MEDIA_QUERY_KEY = 'retrieve-media';

export const useListMedia = (queryParams: TListMediaQueryParams) => {
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
      onError: (err: string) => {
        toast.error(err || 'Error fetching media');
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
  const { isLoading, data, refetch, isFetching, error } = useQuery(
    [RETRIEVE_MEDIA_QUERY_KEY, id],
    () => (validId ? retrieveMedia(id) : undefined),
    {
      enabled: validId,
      refetchOnWindowFocus: false,
      onError: (err: string) => {
        toast.error(err || 'Error retrieving media');
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

  const { mutate: onRemoveMedia } = useMutation(
    (id: number) => removeMedia(id),
    {
      onSuccess: () => {
        // TODO: Use i18n for this message
        toast.success('Media removed successfully');
        queryClient.invalidateQueries(LIST_MEDIA_QUERY_KEY);
      },
      onError: (error: string) => {
        // TODO: Use i18n for this message
        toast.error(error || 'Error removing media');
      },
    },
  );

  return { onRemoveMedia };
};
