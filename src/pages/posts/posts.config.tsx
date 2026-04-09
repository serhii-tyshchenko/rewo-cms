import { Link } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

import { TFunction } from 'i18next';

import { Checkbox, IconButton, IconEmoji, IconLink } from '@components/ui';

import { POSTS_STATUS_TO_ICON_MAP, ROUTE } from '@constants';

import { TListPost, TTableColumnConfig, TTag } from '@types';

import { isPostDeleted, normalizeString, prettyNumber } from '@utils';

interface IArgs {
  allTags: TTag[];
  entries: TListPost[];
  isSelectionDisabled?: boolean;
  onQuickEditPost: (row: TListPost) => void;
  onRemovePost: (row: TListPost) => void;
  onToggleAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectRow: (row: TListPost) => void;
  selectedRows: TListPost[];
  t: TFunction;
}

export const getColumns = ({
  allTags,
  entries,
  isSelectionDisabled = false,
  onQuickEditPost,
  onRemovePost,
  onSelectRow,
  onToggleAll,
  selectedRows,
  t,
}: IArgs): TTableColumnConfig<TListPost> => [
  {
    key: 'checkbox',
    title: '',
    style: {
      width: '40px',
    },
    cell: (row) => (
      <Checkbox
        onChange={() => onSelectRow(row)}
        value={row.id}
        checked={selectedRows.some((item) => item.id === row.id)}
        disabled={
          !selectedRows?.some((item) => item.id === row.id) &&
          isSelectionDisabled
        }
        className="block mx-auto"
      />
    ),
    headerCell: () => (
      <Checkbox
        onChange={onToggleAll}
        className="block mx-auto"
        checked={
          selectedRows.length > 0 && selectedRows.length === entries.length
        }
      />
    ),
  },
  {
    key: 'id',
    title: t('id'),
    cellClassName: 'text-sm',
    style: {
      width: '80px',
    },
  },
  {
    key: 'title',
    title: t('title'),
    cell: (row) => (
      <div className="flex items-center">
        <Link to={`${ROUTE.POSTS}/${row.id}`} className="mr-1">
          {normalizeString(row.title)}
        </Link>
        <IconEmoji
          title={t(`postStatuses.${row.status}`)}
          icon={POSTS_STATUS_TO_ICON_MAP[row.status]}
          size="small"
        />
      </div>
    ),
    className: 'text-left',
  },
  {
    key: 'tags',
    title: t('tags'),
    cell: (row) =>
      allTags
        .filter((tag) => row.tags?.includes(tag.id))
        .map(({ id, name }, idx, array) => (
          <Fragment key={`${row.id}-${id}`}>
            <Link to={`${ROUTE.POSTS}?tags=${id}`}>{name}</Link>
            {idx < array.length - 1 && ', '}
          </Fragment>
        )),
    cellClassName: 'text-sm',
    style: {
      width: '300px',
    },
  },
  {
    key: 'date',
    title: t('date'),
    cellClassName: 'text-sm',
    style: {
      width: '200px',
    },
  },
  {
    key: 'categories',
    title: t('categories'),
    cell: (row) =>
      row.categories.map((id, idx, array) => (
        <Fragment key={`${row.id}-${id}`}>
          <Link key={id} to={`${ROUTE.POSTS}?categories=${id}`}>
            {id}
          </Link>
          {idx < array.length - 1 && ', '}
        </Fragment>
      )),
    cellClassName: 'text-sm',
    style: {
      width: '110px',
    },
  },
  {
    key: 'buttons',
    title: t('actions'),
    style: {
      width: '100px',
    },
    cell: (row) => {
      const shouldDisableViewButton = isPostDeleted(row.status);

      return (
        <div className="flex gap-2 justify-center items-center">
          <IconLink
            external
            icon="link-ext"
            title={t('viewOnSite')}
            to={row.link}
            disabled={shouldDisableViewButton}
          />
          <IconButton
            icon="pencil"
            title={t('quickEdit')}
            onClick={() => onQuickEditPost(row)}
          />
          <IconButton
            icon="trash"
            onClick={() => onRemovePost(row)}
            title={t('removePost')}
          />
        </div>
      );
    },
  },
];
