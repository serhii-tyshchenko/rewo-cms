import { TControlSize } from '@types';

import { getClassName } from '@utils';

import { Error } from '../error';
import { Label } from '../label';
import './input-datetime.styles.scss';

const NAME_SPACE = 'input-datetime';

interface IProps {
  id?: string;
  name?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  error?: string;
  size?: TControlSize;
  testId?: string;
  value?: string;
}

function InputDateTime(props: IProps) {
  const {
    id = NAME_SPACE,
    name = NAME_SPACE,
    onChange,
    className = '',
    required = false,
    disabled = false,
    label = 'Select date and time',
    error = '',
    size = 'normal',
    testId = NAME_SPACE,
    value = '',
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
      <input
        type="datetime-local"
        id={name || id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        step="1"
        className={rootClassName}
        data-testid={testId}
      />
      {error && <Error size={size}>{error}</Error>}
    </>
  );
}

export default InputDateTime;
