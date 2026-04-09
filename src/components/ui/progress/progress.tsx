import { TControlSize } from '@types';

import { getClassName } from '@utils';

import './progress.styles.scss';

const NAME_SPACE = 'ui-progress';

interface IProps {
  id?: string;
  max: number;
  value: number;
  label?: string;
  className: string;
  size: TControlSize;
  testId?: string;
}

function Progress(props: IProps) {
  const {
    value,
    max = 100,
    id = NAME_SPACE,
    label = '',
    className = '',
    size = 'normal',
    testId = 'ui-progress',
  } = props;

  const rootClassName = getClassName(
    NAME_SPACE,
    `${NAME_SPACE}--${size}`,
    className,
  );

  return (
    <div className={rootClassName} data-testid={testId}>
      {label && (
        <label htmlFor={id} className={`${NAME_SPACE}__label`}>
          {label}
        </label>
      )}
      <progress
        id={id}
        className={`${NAME_SPACE}__bar`}
        value={value}
        max={max}
      />
    </div>
  );
}

export default Progress;
