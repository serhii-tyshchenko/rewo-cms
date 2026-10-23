import { fireEvent, render } from '@testing-library/react';

import Input from './input-number';

const testId = 'ui-input-number';

describe('(Component) InputNumber', () => {
  it('should apply the className "test"', () => {
    const { getByTestId } = render(
      <Input className="test" onChange={() => {}} />,
    );
    expect(getByTestId(testId)).toHaveClass('test');
  });

  it('should apply the size prop', () => {
    const { getByTestId } = render(<Input size="big" onChange={() => {}} />);
    expect(getByTestId(testId)).toHaveClass('input-number--big');
  });

  it('should apply the label prop', () => {
    const { getByText } = render(
      <Input label="Username" onChange={() => {}} />,
    );
    expect(getByText('Username')).toBeInTheDocument();
  });

  it('should apply the error prop', () => {
    const { getByText } = render(
      <Input error="Invalid input" onChange={() => {}} />,
    );
    expect(getByText('Invalid input')).toBeInTheDocument();
  });

  it('should call onChange when input value changes', () => {
    const onChange = vi.fn();
    const { getByTestId } = render(<Input onChange={onChange} value="some" />);
    fireEvent.change(getByTestId(testId), { target: { value: 'test' } });
    expect(onChange).toHaveBeenCalled();
  });

  it('should call onKeyDown when a key is pressed', () => {
    const onKeyDown = vi.fn();
    const { getByTestId } = render(
      <Input onKeyDown={onKeyDown} onChange={() => {}} />,
    );
    fireEvent.keyDown(getByTestId(testId), { key: 'Enter' });
    expect(onKeyDown).toHaveBeenCalled();
  });

  it('should be disabled when disabled prop is true', () => {
    const { getByTestId } = render(<Input disabled onChange={() => {}} />);
    expect(getByTestId(testId)).toBeDisabled();
  });

  it('should apply the min prop', () => {
    const { getByTestId } = render(<Input min={1} onChange={() => {}} />);
    expect(getByTestId(testId)).toHaveAttribute('min', '1');
  });

  it('should apply the max prop', () => {
    const { getByTestId } = render(<Input max={10} onChange={() => {}} />);
    expect(getByTestId(testId)).toHaveAttribute('max', '10');
  });

  it('should have autoFocus when autoFocus prop is true', () => {
    const { getByTestId } = render(<Input autoFocus onChange={() => {}} />);
    expect(getByTestId(testId)).toHaveFocus();
  });
});
