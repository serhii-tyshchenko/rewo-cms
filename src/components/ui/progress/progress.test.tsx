import { render } from '@testing-library/react';

import Progress from './progress';

const testId = 'ui-progress';

describe('(Component) Progress', () => {
  it('should apply the className "test"', () => {
    const { getByTestId } = render(
      <Progress
        id="progress2"
        max={100}
        value={50}
        label="Progress 2"
        className="test"
        size="big"
        testId={testId}
      />,
    );
    expect(getByTestId(testId)).toHaveClass('test');
  });

  it('should apply the size prop', () => {
    const { getByTestId } = render(
      <Progress
        id="progress3"
        max={100}
        value={50}
        label="Progress 3"
        className="test"
        size="big"
        testId={testId}
      />,
    );
    expect(getByTestId(testId)).toHaveClass('ui-progress--big');
  });

  it('should display the label prop', () => {
    const { getByTestId, getByText } = render(
      <Progress
        id="progress4"
        max={100}
        value={50}
        label="Progress 4"
        className="test"
        size="big"
        testId={testId}
      />,
    );
    expect(getByTestId(testId)).toHaveTextContent('Progress 4');
    expect(getByText('Progress 4')).toBeInTheDocument();
  });

  it('should have the correct max and value props', () => {
    const { getByTestId } = render(
      <Progress
        id="progress5"
        max={100}
        value={50}
        label="Progress 5"
        className="test"
        size="big"
        testId={testId}
      />,
    );
    expect(getByTestId(testId).children[1]).toHaveAttribute('max', '100');
    expect(getByTestId(testId).children[1]).toHaveAttribute('value', '50');
  });
});
