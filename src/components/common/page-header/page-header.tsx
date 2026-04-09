interface IProps {
  children?: React.ReactNode;
}
function PageHeader(props: IProps) {
  const { children } = props;

  return <div className="flex justify-between mb-2">{children}</div>;
}

export default PageHeader;
