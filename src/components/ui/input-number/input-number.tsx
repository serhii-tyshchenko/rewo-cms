import { noop } from 'lodash-es';

import { TControlSize } from '@types';

import { getClassName } from '@utils';

import { Error } from '../error';
import { Label } from '../label';
import './input-number.styles.scss';

const NAME_SPACE = 'input-number';

interface IProps {
  name?: string;
  id?: string;
  testId?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  value?: string | number;
  placeholder?: string;
  required?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  label?: string;
  error?: string;
  min?: number;
  max?: number;
  size?: TControlSize;
  title?: string;
  readonly?: boolean;
  autocomplete?: string;
}

function InputNumber(props: IProps) {
  const {
    name = NAME_SPACE,
    id = NAME_SPACE,
    testId = 'ui-input-number',
    value = '',
    onChange,
    onBlur = noop,
    onKeyDown = noop,
    className = '',
    placeholder = '',
    required = false,
    autoFocus = false,
    disabled = false,
    readonly = false,
    label = '',
    error = '',
    min = undefined,
    max = undefined,
    size = 'normal',
    title = '',
    autocomplete = 'off',
  } = props;

  const rootClassName = getClassName(
    NAME_SPACE,
    `${NAME_SPACE}--${size}`,
    {
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
        type="number"
        id={name || id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        required={required}
        autoFocus={autoFocus}
        disabled={disabled}
        readOnly={readonly}
        min={min}
        max={max}
        className={rootClassName}
        data-testid={testId}
        title={title}
        autoComplete={autocomplete}
      />
      {error && <Error size={size}>{error}</Error>}
    </>
  );
}

export default InputNumber;
