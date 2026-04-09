import { TTableColumnConfig, TTableData } from '@types';

import { getClassName } from '@utils';

import TableBody from './table-body';
import TableHead from './table-head';
import './table.styles.scss';

const NAME_SPACE = 'table';

interface IProps<T> {
  data: TTableData<T>[];
  className?: string;
  columns: TTableColumnConfig<T>;
}

function Table<T>(props: IProps<T>) {
  const { data, className = '', columns } = props;

  const componentClassName = getClassName(NAME_SPACE, className);

  return (
    <table className={componentClassName}>
      <TableHead columns={columns} />
      <TableBody data={data} columns={columns} />
    </table>
  );
}

export default Table;
