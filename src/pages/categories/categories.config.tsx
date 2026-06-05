import { Link } from 'react-router-dom';

import { TFunction } from 'i18next';

import { Button, IconButton, IconLink } from '@components/ui';

import { ROUTE } from '@constants/_common';

import { TCategory, TTableColumnConfig } from '@types';

import { TCategoryAction } from './types';

export const getColumns = (
  t: TFunction,
  onActionClick: (row: TCategory, action: TCategoryAction) => void,
): TTableColumnConfig<TCategory> => [
  {
    cellClassName: 'text-sm',
    key: 'id',
    title: t('id'),
    style: {
      width: '80px',
    },
  },
  {
    key: 'name',
    title: t('name'),
    className: 'text-left',
    cell: (row) => (
      <Button
        onClick={() => onActionClick(row, 'edit')}
        title={t('editCategory')}
        variant="action"
        className="p-0"
      >
        {row.name}
      </Button>
    ),
  },
  {
    cellClassName: 'text-sm',
    key: 'description',
    title: t('description'),
  },
  {
    cellClassName: 'text-sm',
    key: 'slug',
    title: t('slug'),
  },
  {
    cellClassName: 'text-sm',
    cell: (row) => (
      <Link key={row.id} to={`${ROUTE.POSTS}?categories=${row.id}`}>
        {row.count}
      </Link>
    ),
    key: 'count',
    title: t('count'),
    style: {
      width: '150px',
    },
  },
  {
    key: 'buttons',
    title: t('actions'),
    style: {
      width: '100px',
    },
    cell: (row) => (
      <div className="flex gap-1 justify-evenly items-center">
        <IconLink
          to={row.link}
          icon="link-ext"
          title={t('viewOnSite')}
          external
        />
        <IconButton
          icon="trash"
          onClick={() => onActionClick(row, 'delete')}
          title={t('removeCategory')}
        />
      </div>
    ),
  },
];
