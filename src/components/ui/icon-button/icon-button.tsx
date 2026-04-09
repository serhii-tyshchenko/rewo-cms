import { LegacyRef, forwardRef } from 'react';

import { TControlSize } from '@types';

import { getClassName } from '@utils';

import './icon-button.styles.scss';

const NAME_SPACE = 'icon-button';

interface IProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: string;
  title?: string;
  size?: TControlSize;
  disabled?: boolean;
  autoFocus?: boolean;
  toggled?: boolean;
  testId?: string;
}

const IconButton = forwardRef((props: IProps, ref) => {
  const {
    icon = 'trash',
    onClick = () => {},
    className = '',
    title = 'Click me',
    type = 'button',
    size = 'normal',
    disabled = false,
    autoFocus = false,
    toggled = false,
    testId = 'ui-icon-button',
  } = props;

  const componentClassName = getClassName(
    NAME_SPACE,
    `icon-${icon}`,
    `${NAME_SPACE}--${size}`,
    { [`${NAME_SPACE}--toggled`]: toggled },
    className,
  );

  return (
    <button
      type={type}
      className={componentClassName}
      onClick={onClick}
      title={title}
      aria-label={title}
      disabled={disabled}
      ref={ref as LegacyRef<HTMLButtonElement>}
      autoFocus={autoFocus}
      data-testid={testId}
    />
  );
});

export default IconButton;
