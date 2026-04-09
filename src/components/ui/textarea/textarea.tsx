import { TControlSize } from '@types';

import { getClassName } from '@utils';

import { Error } from '../error';
import { Label } from '../label';
import './textarea.styles.scss';

const NAME_SPACE = 'textarea';

interface IProps {
  name?: string;
  id?: string;
  testId?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
  placeholder?: string;
  required?: boolean;
  autofocus?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  label?: string;
  innerRef?:
    | React.RefObject<HTMLTextAreaElement>
    | string
    | ((instance: HTMLTextAreaElement) => void)
    | null;
  size?: TControlSize;
  error?: string;
  style?: React.CSSProperties;
}

function Textarea(props: IProps) {
  const {
    name = NAME_SPACE,
    id,
    testId = NAME_SPACE,
    value = '',
    onChange,
    className = '',
    placeholder = '',
    required = false,
    autofocus = false,
    disabled = false,
    readOnly = false,
    label = '',
    innerRef = null,
    size = 'normal',
    style = {},
    error = '',
  } = props;

  const rootClassName = getClassName(
    NAME_SPACE,
    {
      [`${NAME_SPACE}--${size}`]: size,
      [`${NAME_SPACE}--error`]: error,
    },
    className,
  );
  // TODO move label and error to separate components
  return (
    <>
      {label && (
        <Label size={size} required={required} forId={id ?? name}>
          {label}
        </Label>
      )}
      <textarea
        name={name}
        id={id ?? name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoFocus={autofocus}
        disabled={disabled}
        readOnly={readOnly}
        ref={innerRef}
        style={style}
        className={rootClassName}
        data-testid={testId}
      />
      {error && <Error size={size}>{error}</Error>}
    </>
  );
}

export default Textarea;
