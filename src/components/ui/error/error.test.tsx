import { render } from '@testing-library/react';

import Error from './error';

const testId = 'ui-error';

const testError = 'Some error message';

describe('(Component) Error', () => {
  it('should apply the className "test"', () => {
    const { getByTestId } = render(<Error className="test">{testError}</Error>);
    expect(getByTestId(testId)).toHaveClass('test');
  });

  it('should apply the size prop', () => {
    const { getByTestId } = render(<Error size="big">{testError}</Error>);
    expect(getByTestId(testId)).toHaveClass('error text-xl');
  });

  it('should render the children', () => {
    const { getByTestId } = render(<Error>Some error message</Error>);
    expect(getByTestId(testId)).toHaveTextContent('Some error message');
  });
});
