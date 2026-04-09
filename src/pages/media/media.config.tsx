import { Link } from 'react-router-dom';

import { TFunction } from 'i18next';

import {
  renderIconButtonsCell,
  renderLinkCell,
} from '@components/ui/table/cells';

import { API_ROOT_URL, ROUTE } from '@constants';

import { TMedia, TTableColumnConfig } from '@types';

export const getColumns = (
  t: TFunction,
  onButtonClick: (id: number) => void,
): TTableColumnConfig<TMedia> => [
  {
    key: 'id',
    title: t('id'),
    cellClassName: 'text-sm',
  },
  {
    key: 'title',
    title: t('title'),
    className: 'text-left',
    cell: (row: TMedia) => (
      <div className="flex items-center gap-2">
        {row.thumbnail ? (
          <img
            src={row.thumbnail}
            alt={row.title}
            loading="lazy"
            width={32}
            height={32}
          />
        ) : null}
        {renderLinkCell(row.sourceUrl, row.title)}
      </div>
    ),
  },
  {
    key: 'date',
    title: t('date'),
    cellClassName: 'text-sm',
  },
  {
    key: 'postId',
    title: t('postId'),
    cellClassName: 'text-sm',
    cell: (row: TMedia) => (
      <Link to={`${ROUTE.POSTS}/${row.postId}`}>{row.postId}</Link>
    ),
  },
  {
    key: 'sizes',
    title: t('sizes'),
    cellClassName: 'text-sm',
  },
  {
    key: 'buttons',
    title: t('actions'),
    style: {
      width: '40px',
    },
    cell: (row: TMedia) =>
      renderIconButtonsCell([
        {
          icon: 'trash',
          onClick: () => onButtonClick(+row.id),
          title: t('removeMedia'),
        },
      ]),
  },
];
