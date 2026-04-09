interface IProps {
  children: React.ReactNode;
  className?: string;
  testId?: string;
}

function EmptyState(props: IProps) {
  const { children, className = '', testId = 'ui-empty-state' } = props;
  const componentClassName = `flex items-center justify-center h-full grow ${className}`;

  return (
    <div className={componentClassName} data-testid={testId}>
      {children}
    </div>
  );
}

export default EmptyState;
