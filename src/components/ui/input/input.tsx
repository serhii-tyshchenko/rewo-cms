/* eslint-disable react/jsx-props-no-spreading */
import { noop } from 'lodash-es';

import { getClassName } from '@utils';

import { Error } from '../error';
import { Label } from '../label';
import './input.styles.scss';
import type {
  TInputCommonProps,
  TInputNumberSpecificProps,
  TInputTextSpecificProps,
} from './input.types';

const NAME_SPACE = 'input';

function Input(
  props: TInputCommonProps &
    TInputNumberSpecificProps &
    TInputTextSpecificProps,
) {
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
    placeholder = undefined,
    required = false,
    autoFocus = false,
    disabled = false,
    readOnly = false,
    label = '',
    error = '',
    min = undefined,
    max = undefined,
    size = 'normal',
    title = undefined,
    autoComplete = 'off',
    step = undefined,
    minLength = undefined,
    maxLength = undefined,
    pattern = undefined,
  } = props;

  const rootClassName = getClassName(
    NAME_SPACE,
    `${NAME_SPACE}--${type}`,
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
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={autoFocus}
        disabled={disabled}
        readOnly={readOnly}
        min={min}
        max={max}
        className={rootClassName}
        data-testid={testId}
        title={title}
        autoComplete={autoComplete}
        step={step}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
      />
      {error && <Error size={size}>{error}</Error>}
    </>
  );
}

function InputNumber(
  props: Omit<TInputCommonProps & TInputNumberSpecificProps, 'type'>,
) {
  return <Input {...props} type="number" />;
}

function InputText(
  props: Omit<TInputCommonProps & TInputTextSpecificProps, 'type'>,
) {
  return <Input {...props} type="text" />;
}

function InputPassword(
  props: Omit<TInputCommonProps & TInputTextSpecificProps, 'type'>,
) {
  return <Input {...props} type="password" />;
}

function InputSearch(
  props: Omit<TInputCommonProps & TInputTextSpecificProps, 'type'>,
) {
  return <Input {...props} type="search" />;
}

export { InputNumber, InputText, InputPassword, InputSearch };
