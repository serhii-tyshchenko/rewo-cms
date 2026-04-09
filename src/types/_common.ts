export type TDic = {
  [key: string]:
    | string
    | ((...args: any[]) => string)
    | { [key: string]: string | { [key: string]: string } };
};

export type TControlSize = 'small' | 'normal' | 'big';

export type TTableColumnConfig<T> = Array<{
  className?: string;
  cell?: (
    row: T,
    index: number,
  ) => string | number | JSX.Element | JSX.Element[] | null;
  cellClassName?: string;
  headerCell?: () => string | number | JSX.Element | null;
  key: keyof T | 'buttons' | 'checkbox';
  style?: React.CSSProperties;
  title?: string;
}>;

export type TTableData<T> = T & {
  id: string | number;
};

export type TListGenericData<T> = {
  data: T[];
  total: number;
  pages: number;
};

export type TNotification = {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  autoclose: boolean;
  delay: number;
};

export type TSearchParams = {
  search: string;
  page: string;
  orderby?: string;
  order?: string;
  perPage?: string;
};

export type TSnippet = {
  id: string;
  value: string;
};

export type TEmojiIcon =
  | 'calendar'
  | 'draft'
  | 'hourglass'
  | 'lock'
  | 'trash'
  | 'warning'
  | 'image';
