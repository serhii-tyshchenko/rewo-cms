import { DataTableToolbar } from '@components/common';

import { TListCategoriesQueryParams } from '@types';

interface IProps {
  onRefresh: () => void;
  queryParams: TListCategoriesQueryParams;
  onQueryParamsChange: (params: TListCategoriesQueryParams) => void;
  sortingConfig: string[];
}

function CategoriesTableToolbar(props: IProps) {
  const { queryParams, onQueryParamsChange, onRefresh, sortingConfig } = props;

  return (
    <DataTableToolbar<TListCategoriesQueryParams>
      queryParams={queryParams}
      onQueryParamsChange={onQueryParamsChange}
      onRefresh={onRefresh}
      sortingConfig={sortingConfig}
    />
  );
}

export default CategoriesTableToolbar;
