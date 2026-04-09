import './left-panel.styles.scss';

const NAME_SPACE = 'post-form-left-panel';

interface IProps {
  children: React.ReactNode;
}

function LeftPanel(props: IProps) {
  const { children } = props;
  return (
    <div className={NAME_SPACE} data-testid={NAME_SPACE}>
      {children}
    </div>
  );
}

export { LeftPanel };
