import { Link } from 'react-router-dom';

import { TControlSize } from '@types';

import { getClassName } from '@utils';

import './icon-link.styles.scss';

const NAME_SPACE = 'icon-link';

interface IProps {
  className?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: string;
  size?: TControlSize;
  title?: string;
  to: string;
}

function IconLink(props: IProps) {
  const {
    className = '',
    disabled = false,
    external = false,
    icon = 'link-ext',
    size = 'normal',
    title = 'Visit',
    to,
  } = props;

  const componentClassName = getClassName(
    NAME_SPACE,
    `icon-${icon}`,
    `${NAME_SPACE}--${size}`,
    {
      [`${NAME_SPACE}--disabled`]: disabled,
    },
    className,
  );

  if (external) {
    return (
      <a
        href={to}
        className={componentClassName}
        title={title}
        aria-label={title}
        target="_blank"
        rel="noopener noreferrer"
      />
    );
  }

  return (
    <Link
      to={to}
      className={componentClassName}
      title={title}
      aria-label={title}
    />
  );
}

export default IconLink;
