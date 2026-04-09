import { TControlSize } from '@types';

import { getClassName } from '@utils';

import { Error } from '../error';
import { Label } from '../label';
import './select.styles.scss';

const NAME_SPACE = 'select';

interface IProps {
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string | number;
  title?: string;
  options: {
    value: string | number;
    label: string;
    disabled?: boolean;
    title?: string;
  }[];
  required?: boolean;
  disabled?: boolean;
  size?: TControlSize;
  id?: string;
  testId?: string;
  name?: string;
  label?: string;
  error?: string;
  style?: React.CSSProperties;
}

function Select(props: IProps) {
  const {
    value = '',
    onChange = () => {},
    options = [],
    className = '',
    title = 'Select option',
    required = false,
    disabled = false,
    size = 'normal',
    id = NAME_SPACE,
    name = NAME_SPACE,
    testId = 'ui-select',
    label = '',
    error = '',
    style = {},
  } = props;

  const rootClassName = getClassName(
    NAME_SPACE,
    {
      [`${NAME_SPACE}--${size}`]: size,
      [`${NAME_SPACE}--error`]: error,
    },
    className,
  );

  return (
    <>
      {label && (
        <Label size={size} required={required} forId={name || id || ''}>
          {label}
        </Label>
      )}
      <select
        name={name}
        id={name || id}
        onChange={onChange}
        value={value}
        required={required}
        title={title}
        disabled={disabled}
        style={style}
        className={rootClassName}
        data-testid={testId}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            title={option.title}
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && <Error size={size}>{error}</Error>}
    </>
  );
}

export default Select;
