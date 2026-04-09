import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';

import { listUsers } from '@api';

import { doAddErrorNotification } from '@store/actions';

import { TListUsersData, TListUsersQueryParams } from '@types';

const LIST_USERS_QUERY_KEY = 'list-users';

export const useListUsers = (queryParams: TListUsersQueryParams) => {
  const dispatch = useDispatch();
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
    data: safeData as TListUsersData,
    refetch,
    isFetching,
  };
};
