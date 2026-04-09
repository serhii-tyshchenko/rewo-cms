import { Link } from 'react-router-dom';

import { TFunction } from 'i18next';

import { renderIconButtonsCell } from '@components/ui/table/cells';

import { ROUTE } from '@constants/_common';
import { TAG_ACTION } from '@constants/_tags';

import { TTableColumnConfig, TTag } from '@types';

export const getColumns = (
  t: TFunction,
  onButtonClick: (row: TTag, action: string) => void,
): TTableColumnConfig<TTag> => [
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
    className: 'text-left',
  },
  {
    key: 'description',
    title: t('description'),
    cellClassName: 'text-sm',
  },
  {
    key: 'slug',
    title: t('slug'),
    cellClassName: 'text-sm',
  },
  {
    key: 'count',
    title: t('count'),
    cellClassName: 'text-sm',
    cell: (row) => <Link to={`${ROUTE.POSTS}?tags=${row.id}`}>{row.name}</Link>,
    style: {
      width: '200px',
    },
  },
  {
    key: 'buttons',
    title: t('actions'),
    style: {
      width: '90px',
    },
    cell: (row: TTag) =>
      renderIconButtonsCell([
        {
          icon: 'pencil',
          onClick: () => onButtonClick(row, TAG_ACTION.EDIT),
          title: t('editTag'),
          className: 'mr-1',
        },
        {
          icon: 'trash',
          onClick: () => onButtonClick(row, TAG_ACTION.REMOVE),
          title: t('removeTag'),
        },
      ]),
  },
];
