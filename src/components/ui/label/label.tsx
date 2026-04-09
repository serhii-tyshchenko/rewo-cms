import { TControlSize } from '@types';

import { getClassName } from '@utils';

import './label.styles.scss';

const NAME_SPACE = 'label';

interface IProps {
  forId: string;
  required?: boolean;
  children: React.ReactNode;
  size?: TControlSize;
  className?: string;
}

function Label(props: IProps) {
  const {
    required = false,
    children,
    forId,
    size = 'normal',
    className = '',
  } = props;

  const componentClassName = getClassName(
    NAME_SPACE,
    {
      [`${NAME_SPACE}--${size}`]: size,
      [`${NAME_SPACE}--required`]: required,
    },
    className,
  );

  return (
    <label htmlFor={forId} className={componentClassName}>
      {children}
    </label>
  );
}

export default Label;
