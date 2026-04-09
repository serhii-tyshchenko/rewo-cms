import { TControlSize } from '@types';

import { getClassName } from '@utils';

import './error.styles.scss';

const NAME_SPACE = 'error';

interface IProps {
  children: React.ReactNode;
  size?: TControlSize;
  className?: string;
  testId?: string;
}

function Error(props: IProps) {
  const {
    children,
    size = 'normal',
    className = '',
    testId = 'ui-error',
  } = props;

  const componentClassName = getClassName(
    NAME_SPACE,
    {
      'text-xs': size === 'small',
      'text-base': size === 'normal',
      'text-xl': size === 'big',
    },
    'block',
    className,
  );

  return (
    <span className={componentClassName} data-testid={testId}>
      {children}
    </span>
  );
}

export default Error;
