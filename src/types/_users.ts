import { TListGenericData } from './_common';

type TRequestScope = 'view' | 'embed' | 'edit';

type TUserRole =
  | 'administrator'
  | 'author'
  | 'contributor'
  | 'editor'
  | 'subscriber';

export type TListUsersQueryParams = {
  context?: TRequestScope;
  page?: number;
  per_page?: number;
  search?: string;
  order?: 'asc' | 'desc';
  orderby?: 'id' | 'name' | 'registered_date';
  // roles?: string[];
  has_published_posts?: boolean;
};

export type TUserDto = {
  id: number;
  name: string;
  username: string;
  email: string;
  roles: TUserRole[];
};

export type TUser = {
  id: number;
  name: string;
  email: string;
  role: TUserRole;
};

export type TListUsersData = TListGenericData<TUser>;
