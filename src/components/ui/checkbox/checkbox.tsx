import { TControlSize } from '@types';

import { getClassName } from '@utils';

import { Label } from '../label';
import './checkbox.styles.scss';

const NAME_SPACE = 'checkbox';

interface IProps {
  name?: string;
  id?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  style?: React.CSSProperties;
  checked?: boolean;
  size?: TControlSize;
  testId?: string;
}

function Checkbox(props: IProps) {
  const {
    name = NAME_SPACE,
    id = NAME_SPACE,
    value = '',
    onChange,
    className = '',
    required = false,
    disabled = false,
    label = '',
    style = {},
    checked = false,
    size = 'normal',
    testId = 'ui-checkbox',
  } = props;

  const rootClassName = getClassName(
    NAME_SPACE,
    `${NAME_SPACE}--${size}`,
    { 'mr-1': !!label },
    className,
  );

  return (
    <>
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        className={rootClassName}
        onChange={onChange}
        required={required}
        disabled={disabled}
        style={style}
        checked={checked}
        data-testid={testId}
      />
      {label && (
        <Label forId={id || ''} size={size} required={required}>
          {label}
        </Label>
      )}
    </>
  );
}

export default Checkbox;
