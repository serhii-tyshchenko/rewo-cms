import { IconButton } from '@components/ui';

interface IProps {
  config: Array<{
    icon: string;
    title: string;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
    toggled?: boolean;
  }>;
}

function Toolbar(props: IProps) {
  const { config } = props;

  return (
    <div className="flex items-center mb-2">
      {config.map(({ icon, title, onClick, className, disabled, toggled }) => (
        <IconButton
          key={icon}
          icon={icon}
          title={title}
          onClick={onClick}
          className={className}
          disabled={disabled}
          toggled={toggled}
        />
      ))}
    </div>
  );
}

export default Toolbar;
