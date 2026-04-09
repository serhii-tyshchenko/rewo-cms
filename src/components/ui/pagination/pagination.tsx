/* eslint-disable react/no-array-index-key */
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { noop } from 'lodash-es';

import { getClassName } from '@utils';

import { IconButton } from '../icon-button';
import { PaginationItem } from './pagination-item';
import './pagination.styles.scss';
import { getPages } from './pagination.utils';

const NAME_SPACE = 'pagination';

interface IProps {
  totalPages: number;
  currentPage: number;
  className?: string;
  onPageClick?: (page: number) => void;
  maxVisiblePages?: number;
}

function Pagination(props: IProps) {
  const {
    totalPages,
    currentPage,
    className = '',
    onPageClick = noop,
    maxVisiblePages = 3,
  } = props;
  const { t } = useTranslation();

  const pages = useMemo<number[]>(
    () => getPages(currentPage, totalPages, maxVisiblePages),
    [totalPages, currentPage, maxVisiblePages],
  );

  const componentClassName = getClassName(NAME_SPACE, className);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={componentClassName}>
      <IconButton
        onClick={() => onPageClick(currentPage - 1)}
        disabled={currentPage === 1}
        icon="left-big"
        size="big"
        title={t('previousPage')}
      />
      {pages.map((page, index) => (
        <PaginationItem
          key={index}
          onChange={(newPage: number) => onPageClick(newPage)}
          isCurrent={page === currentPage}
          label={page.toString()}
          totalPages={totalPages}
        />
      ))}
      <IconButton
        onClick={() => onPageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        icon="right-big"
        size="big"
        title={t('nextPage')}
      />
    </div>
  );
}

export default Pagination;
