import { useTranslation } from 'react-i18next';

import { noop } from 'lodash-es';

import { getClassName } from '@utils';

import { Button } from '../../button';
import { Select } from '../../select';
import './pagination-item.styles.scss';

const NAME_SPACE = 'pagination-item';

// TODO move to utils
const getSelectOptions = (totalPages: number) =>
  Array.from({ length: totalPages }, (_, index) => ({
    value: index + 1,
    label: (index + 1).toString(),
  }));

interface IProps {
  onChange: (page: number) => void;
  isCurrent?: boolean;
  label?: string;
  className?: string;
  totalPages: number;
}

function PaginationItem(props: IProps) {
  const {
    onChange = noop,
    isCurrent = false,
    label = '',
    className = '',
    totalPages = 1,
  } = props;
  const { t } = useTranslation();

  const componentClassName = getClassName(NAME_SPACE, className);
  const selectClassName = getClassName(componentClassName, 'appearance-none');

  const handleClick = () => {
    onChange(+label);
  };

  const handleChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(+ev.target.value);
  };

  if (isCurrent) {
    const selectOptions = getSelectOptions(totalPages);

    return (
      <Select
        value={label}
        size="small"
        options={selectOptions}
        className={selectClassName}
        onChange={handleChange}
        title={t('selectPage')}
      />
    );
  }

  return (
    <Button
      onClick={handleClick}
      size="small"
      variant="secondary"
      className={componentClassName}
      disabled={isCurrent}
    >
      {label}
    </Button>
  );
}

export default PaginationItem;
