import { isEmpty } from 'lodash-es';

import { extractHeadersData } from '@api/utils';

import { TListUsersData, TUser, TUserDto } from '@types';

export const formatListUsersResponse = (
  data: TUserDto[],
  headers: Headers,
): TListUsersData => ({
  ...extractHeadersData(headers),
  data: !isEmpty(data)
    ? data.map(
        (item): TUser => ({
          id: item.id,
          name: item.name,
          email: item.email,
          role: item.roles?.[0] || '',
        }),
      )
    : [],
});
