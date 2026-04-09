import { getClassName } from '@utils';

interface IProps {
  children: React.ReactNode;
  collapsed?: boolean;
}

function BottomPanel(props: IProps) {
  const { children, collapsed = false } = props;
  const className = getClassName({ hidden: collapsed });

  return (
    <div className={className} data-testid="bottom-panel">
      {children}
    </div>
  );
}

export default BottomPanel;
