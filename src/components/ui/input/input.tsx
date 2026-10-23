import { noop } from 'lodash-es';

import { TControlSize } from '@types';

import { getClassName } from '@utils';

import { Error } from '../error';
import { Label } from '../label';
import './input.styles.scss';

const NAME_SPACE = 'input';

interface IProps {
  type?:
    | 'text'
    | 'password'
    | 'email'
    | 'tel'
    | 'url'
    | 'date'
    | 'time'
    | 'search';
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
  size?: TControlSize;
  title?: string;
  readonly?: boolean;
  autocomplete?: string;
}

function Input(props: IProps) {
  const {
    type = 'text',
    name = NAME_SPACE,
    id = NAME_SPACE,
    testId = 'ui-input',
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
        type={type}
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
        className={rootClassName}
        data-testid={testId}
        title={title}
        autoComplete={autocomplete}
      />
      {error && <Error size={size}>{error}</Error>}
    </>
  );
}

export default Input;
