import { render } from '@testing-library/react';

import EmptyState from './empty-state';

const testText = 'No data available';

describe('(Component) EmptyStatet', () => {
  it('should render the children correctly', () => {
    const { getByText } = render(<EmptyState>{testText}</EmptyState>);
    expect(getByText(testText)).toBeInTheDocument();
  });

  it('should apply the default className and testId', () => {
    const { getByTestId } = render(<EmptyState>{testText}</EmptyState>);
    const element = getByTestId('ui-empty-state');
    expect(element).toHaveClass('flex items-center justify-center h-full grow');
  });

  it('should append custom className', () => {
    const customClass = 'bg-red-500';
    const { getByTestId } = render(
      <EmptyState className={customClass}>{testText}</EmptyState>
    );
    const element = getByTestId('ui-empty-state');
    expect(element).toHaveClass(customClass);
  });

  it('should use custom testId if provided', () => {
    const customTestId = 'custom-empty-state';
    const { getByTestId } = render(
      <EmptyState testId={customTestId}>{testText}</EmptyState>
    );
    expect(getByTestId(customTestId)).toBeInTheDocument();
  });
});
