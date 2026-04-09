import { getClassName } from '@utils';

import { IconButton } from '../icon-button';
import './dropdown.styles.scss';

const NAME_SPACE = 'dropdown';

interface IProps {
  onToggle: () => void;
  className?: string;
  disabled?: boolean;
  opened?: boolean;
  toggleIcon?: string;
  title?: string;
  children?: React.ReactNode;
  testId?: string;
}

function Dropdown(props: IProps) {
  const {
    children = null,
    onToggle,
    disabled = false,
    className = '',
    opened = false,
    toggleIcon = 'ellipsis-vert',
    title = 'Toggle dropdown',
    testId = 'ui-dropdown',
  } = props;

  const togglerBtnIcon = opened ? 'cancel' : toggleIcon;

  const componentClassName = getClassName(NAME_SPACE, className);

  return (
    <div className={componentClassName} data-testid={testId}>
      <IconButton
        onClick={onToggle}
        icon={togglerBtnIcon}
        title={title}
        disabled={disabled}
        toggled={opened}
      />
      {opened && <div className={`${NAME_SPACE}__container`}>{children}</div>}
    </div>
  );
}

export default Dropdown;
