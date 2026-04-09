import { TTableColumnConfig, TTableData } from '@types';

interface IProps<T> {
  data: TTableData<T>[];
  columns: TTableColumnConfig<T>;
}

function TableBody<T>(props: IProps<T>) {
  const { data, columns } = props;

  return (
    <tbody>
      {data.map((row, index: number) => (
        <tr key={row.id}>
          {columns.map((column) => (
            <td key={String(column.key)} className={column.cellClassName}>
              {column.cell ? column.cell(row, index) : row[column.key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
