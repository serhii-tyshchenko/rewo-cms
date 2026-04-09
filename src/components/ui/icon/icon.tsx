import { TControlSize } from '@types';

import { getClassName } from '@utils';

import './icon.styles.scss';

const NAME_SPACE = 'icon';

interface IProps {
  icon: string;
  className?: string;
  title?: string;
  size?: TControlSize;
  testId?: string;
}

function Icon(props: IProps) {
  const {
    icon = 'trash',
    className = '',
    title = '',
    size = 'normal',
    testId = 'ui-icon',
  } = props;

  const componentClassName = getClassName(
    NAME_SPACE,
    `icon-${icon}`,
    `${NAME_SPACE}--${size}`,
    className,
  );

  return (
    <span className={componentClassName} title={title} data-testid={testId} />
  );
}

export default Icon;
