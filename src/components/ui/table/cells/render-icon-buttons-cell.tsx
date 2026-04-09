import { MouseEvent } from 'react';

import { IconButton } from '@components/ui';

type TIconButtonOption = {
  icon: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  title: string;
  disabled?: boolean;
};

const renderIconButtonsCell = (options: TIconButtonOption[]) => (
  <div className="flex gap-1 justify-evenly">
    {options.map(({ icon, onClick, className, title, disabled }) => (
      <IconButton
        icon={icon}
        onClick={onClick}
        className={className}
        disabled={disabled}
        key={title}
        title={title}
      />
    ))}
  </div>
);

export default renderIconButtonsCell;
