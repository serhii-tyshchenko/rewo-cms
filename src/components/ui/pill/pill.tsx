import { TControlSize } from '@types';

import { getClassName } from '@utils';

import './pill.styles.scss';

const NAME_SPACE = 'pill';

interface IProps {
  onClick?: (value: string | number) => void;
  className?: string;
  label?: string;
  value?: string | number;
  size?: TControlSize;
  disabled?: boolean;
  removeTitle?: string;
  noButton?: boolean;
  icon?: string;
}

function Pill(props: IProps) {
  const {
    onClick = null,
    className = '',
    label = 'Click me',
    size = 'normal',
    disabled = false,
    value = '',
    removeTitle = 'Remove',
    noButton = false,
    icon = 'icon-cancel',
  } = props;

  const componentClassName = getClassName(
    NAME_SPACE,
    `${NAME_SPACE}--${size}`,
    {
      [`${NAME_SPACE}--disabled`]: disabled,
    },
    className,
  );

  const handleClick = () => {
    if (onClick && !!value) {
      onClick(value);
    }
  };

  return (
    <div className={componentClassName}>
      <span className={`${NAME_SPACE}__label`}>{label}</span>
      {!noButton && (
        <button
          type="button"
          className={`${NAME_SPACE}__btn ${icon}`}
          onClick={handleClick}
          title={removeTitle}
          aria-label={removeTitle}
          disabled={disabled}
        />
      )}
    </div>
  );
}

export default Pill;
