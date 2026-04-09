import { TControlSize, TEmojiIcon } from '@types';

import { getClassName } from '@utils';

import { ICON_MAP } from './icon-emoji.constants';

interface IProps {
  className?: string;
  icon: TEmojiIcon;
  size?: TControlSize;
  title?: string;
}

function IconEmoji(props: IProps) {
  const {
    className = '',
    icon,
    size = 'normal',
    title = `Emoji Icon ${icon}`,
  } = props;

  const componentClassName = getClassName(
    'user-select-none',
    {
      'text-xs': size === 'small',
    },
    className,
  );

  return (
    <span className={componentClassName} title={title}>
      {ICON_MAP[icon]}
    </span>
  );
}

export { IconEmoji };
