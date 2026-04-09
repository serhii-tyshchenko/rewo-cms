import { useTranslation } from 'react-i18next';

import { IconButton } from '@components/ui';

import { TControlSize } from '@types';

import { getClassName } from '@utils';

interface IProps {
  collapsed: boolean;
  onClick: () => void;
  className?: string;
  size?: TControlSize;
  direction: 'up' | 'down' | 'left' | 'right';
}

function CollapseButton(props: IProps) {
  const {
    collapsed,
    onClick,
    className = '',
    size = 'small',
    direction = 'down',
  } = props;

  const { t } = useTranslation();

  const expandedClass = {
    up: 'rotate-180',
    down: 'rotate-0',
    left: 'rotate-90',
    right: 'rotate-270',
  }[direction];

  const collapsedClass = {
    up: 'rotate-0',
    down: 'rotate-180',
    left: 'rotate-270',
    right: 'rotate-90',
  };
  // TODO add animation support
  const componentClassName = getClassName(
    collapsed ? collapsedClass[direction] : expandedClass,
    className,
  );

  const title = collapsed ? t('expand') : t('collapse');

  return (
    <IconButton
      icon="down-open"
      title={title}
      onClick={onClick}
      className={componentClassName}
      size={size}
    />
  );
}

export default CollapseButton;
