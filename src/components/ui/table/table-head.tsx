import { TTableColumnConfig } from '@types';

interface IProps<T> {
  columns: TTableColumnConfig<T>;
}

function TableHead<T>(props: IProps<T>) {
  const { columns } = props;

  return (
    <thead>
      <tr>
        {columns.map(({ key, title, headerCell, className, style }) => (
          <th
            key={typeof key === 'symbol' ? String(key) : key}
            className={className}
            style={style}
          >
            {headerCell ? headerCell() : title}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHead;
