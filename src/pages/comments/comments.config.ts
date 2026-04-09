import { TFunction } from 'i18next';

import {
  renderIconButtonsCell,
  renderLinkCell,
} from '@components/ui/table/cells';

import { API_ROOT_URL } from '@constants';

import { TComment, TCommentStatus, TTableColumnConfig } from '@types';

export const getColumns = (
  t: TFunction,
  onRemoveComment: (id: number, status: TCommentStatus) => void,
): TTableColumnConfig<TComment> => [
  {
    key: 'id',
    title: t('id'),
    cellClassName: 'text-sm',
  },
  {
    key: 'content',
    title: t('content'),
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
    cell: (row) =>
      renderLinkCell(`${API_ROOT_URL}/?p=${row.postId}`, row.postId.toString()),
  },
  {
    key: 'buttons',
    title: t('actions'),
    style: {
      width: '100px',
    },
    cell: (row) =>
      renderIconButtonsCell([
        {
          icon: 'trash',
          onClick: () => onRemoveComment(row.id, row.status),
          title: t('removeComment'),
        },
      ]),
  },
];
