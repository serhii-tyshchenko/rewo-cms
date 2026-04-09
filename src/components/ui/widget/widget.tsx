import './widget.styles.scss';

const NAME_SPACE = 'widget';

interface IProps {
  title: string;
  children?: React.ReactNode;
}

function Widget(props: IProps) {
  const { title, children } = props;
  return (
    <div className={NAME_SPACE}>
      <h3 className="mb-4">{title}</h3>
      {children && <main className="overflow-y-auto grow">{children}</main>}
    </div>
  );
}

export default Widget;
