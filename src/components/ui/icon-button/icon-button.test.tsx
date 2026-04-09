import { fireEvent, render } from '@testing-library/react';

import IconButton from './icon-button';

const testId = 'ui-icon-button';

describe('(Component) IconButton', () => {
  it('should apply the className "test"', () => {
    const { getByTestId } = render(<IconButton className="test" />);
    expect(getByTestId(testId)).toHaveClass('test');
  });

  it('should apply the size prop', () => {
    const { getByTestId } = render(<IconButton size="big" />);
    expect(getByTestId(testId)).toHaveClass('icon-button--big');
  });

  it('should apply the title prop', () => {
    const { getByTestId } = render(<IconButton title="Click me" />);
    expect(getByTestId(testId)).toHaveAttribute('title', 'Click me');
  });

  it('should call onClick when clicked', () => {
    const onClick = vi.fn();
    const { getByTestId } = render(<IconButton onClick={onClick} />);
    fireEvent.click(getByTestId(testId));
    expect(onClick).toHaveBeenCalled();
  });

  it('should be disabled when disabled prop is true', () => {
    const { getByTestId } = render(<IconButton disabled />);
    expect(getByTestId(testId)).toBeDisabled();
  });

  it('should have autoFocus when autoFocus prop is true', () => {
    const { getByTestId } = render(<IconButton autoFocus />);
    expect(getByTestId(testId)).toHaveFocus();
  });
});
