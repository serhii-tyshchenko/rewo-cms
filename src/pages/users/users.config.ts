import { TFunction } from 'i18next';

import { TTableColumnConfig, TUser } from '@types';

export const getColumns = (t: TFunction): TTableColumnConfig<TUser> => [
  {
    key: 'id',
    title: t('id'),
    cellClassName: 'text-sm',
    style: {
      width: '80px',
    },
  },
  {
    key: 'name',
    title: t('name'),
  },
  {
    key: 'email',
    title: t('email'),
    cellClassName: 'text-sm',
  },
  {
    key: 'role',
    title: t('role'),
    cellClassName: 'text-sm',
    cell: (row) => t(`roles.${row.role}`),
  },
];
