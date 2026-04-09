import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Dropdown, IconButton, Input, Select } from '@components/ui';

import { useToggle } from '@hooks';

import { getSortingOptions } from '@utils';

import { DEFAULT_PER_PAGE_OPTIONS } from './constants';

type TBaseQueryParams = {
  search?: string;
  orderby?: string;
  order?: string;
  page?: number;
  per_page?: number;
};

interface IProps<T> {
  children?: React.ReactNode;
  onQueryParamsChange: (params: Partial<T>) => void;
  onRefresh: () => void;
  queryParams: T;
  sortingConfig: string[];
}

function DataTableToolbar<T extends TBaseQueryParams>(props: IProps<T>) {
  const {
    children,
    queryParams,
    onRefresh,
    onQueryParamsChange,
    sortingConfig,
  } = props;

  const { t } = useTranslation();

  const [isDropdownOpen, toggleDropdown] = useToggle();
  const [searchQuery, setSearchQuery] = useState(queryParams.search || '');

  const handlePerPageChange = (ev: React.ChangeEvent<HTMLSelectElement>) =>
    onQueryParamsChange({
      [ev.target.name]: ev.target.value,
      page: 1,
    } as Partial<T>);

  const handleSortingChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    const [orderby, order] = ev.target.value.split('_');
    onQueryParamsChange({ orderby, order } as Partial<T>);
  };

  const handleSearchQueryChange = (ev: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(ev.target.value);

  const handleSearchSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    onQueryParamsChange({ search: searchQuery, page: 1 } as Partial<T>);
  };

  const sortingOptions = getSortingOptions(t, sortingConfig);

  return (
    <div className="flex items-center mb-4 flex-wrap gap-2">
      {children}
      <form
        onSubmit={handleSearchSubmit}
        className="flex items-center grow ml-auto"
        style={{ maxWidth: '400px' }}
      >
        <Input
          name="search"
          type="search"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          placeholder={t('enterSearchQuery')}
          className="mr-2 grow"
          size="small"
        />
        <Button type="submit" size="small">
          {t('search')}
        </Button>
      </form>
      <div className="flex items-center justify-between gap-1">
        <IconButton icon="arrows-cw" title={t('refresh')} onClick={onRefresh} />
        <Dropdown
          opened={isDropdownOpen}
          onToggle={toggleDropdown}
          toggleIcon="cog"
          title={t('settings')}
        >
          <Select
            name="orderby"
            label={t('sortBy')}
            options={sortingOptions}
            onChange={handleSortingChange}
            value={`${queryParams.orderby}_${queryParams.order}`}
            className="mb-2"
            size="small"
          />
          <Select
            name="per_page"
            label={t('perPage')}
            options={DEFAULT_PER_PAGE_OPTIONS}
            onChange={handlePerPageChange}
            value={queryParams.per_page}
            size="small"
          />
        </Dropdown>
      </div>
    </div>
  );
}

export default DataTableToolbar;
