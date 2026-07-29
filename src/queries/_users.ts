import { useQuery } from 'react-query';

import { listUsers } from '@api';

import { toast } from '@services';

import { TListUsersData, TListUsersQueryParams } from '@types';

const LIST_USERS_QUERY_KEY = 'list-users';

export const useListUsers = (queryParams: TListUsersQueryParams) => {
  const {
    isLoading,
    data = [],
    refetch,
    isFetching,
  } = useQuery(
    [LIST_USERS_QUERY_KEY, queryParams],
    () => listUsers(queryParams),
    {
      refetchOnWindowFocus: false,
      onError: (error: string) => {
        // TODO: Use i18n for this message
        toast.error(error || 'Error fetching users');
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
    data: safeData as TListUsersData,
    refetch,
    isFetching,
  };
};
