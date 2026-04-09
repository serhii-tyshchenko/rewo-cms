import './widget-list.styles.scss';

const NAME_SPACE = 'widget-list';

interface IProps {
  children: React.ReactNode;
}

function WidgetList(props: IProps) {
  const { children } = props;
  return <section className={NAME_SPACE}>{children}</section>;
}

export default WidgetList;
