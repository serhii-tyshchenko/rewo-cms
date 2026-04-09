import { getClassName } from '@utils';

interface IProps {
  className?: string;
  children?: React.ReactNode;
  testId?: string;
}

function FormGroup(props: IProps) {
  const { className = '', children = null, testId = 'ui-form-group' } = props;

  const componentClassName = getClassName('mb-3', className);

  return (
    <div className={componentClassName} data-testid={testId}>
      {children}
    </div>
  );
}

export default FormGroup;
