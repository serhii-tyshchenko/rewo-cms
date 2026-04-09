import { noop } from 'lodash-es';

import { TControlSize } from '@types';

import { getClassName } from '@utils';

import { Icon } from '../icon';
import './button.styles.scss';

const NAME_SPACE = 'button';

interface IProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'action';
  size?: TControlSize;
  children: React.ReactNode;
  title?: string;
  disabled?: boolean;
  testId?: string;
  icon?: string;
}

function Button(props: IProps) {
  const {
    onClick = noop,
    className = '',
    type = 'button',
    variant = 'primary',
    size = 'normal',
    children,
    title = '',
    disabled = false,
    testId = 'ui-button',
    icon,
  } = props;

  const componentClassName = getClassName(
    NAME_SPACE,
    `${NAME_SPACE}--${variant}`,
    `${NAME_SPACE}--${size}`,
    className,
  );

  const showIcon = variant !== 'action' && icon;

  return (
    <button
      type={type}
      className={componentClassName}
      onClick={onClick}
      disabled={disabled}
      title={title}
      data-testid={testId}
    >
      {showIcon && <Icon icon={icon} />}
      {children}
    </button>
  );
}

export default Button;
