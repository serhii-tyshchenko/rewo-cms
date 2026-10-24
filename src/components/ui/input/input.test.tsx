import { fireEvent, render } from '@testing-library/react';

import { InputNumber, InputPassword, InputSearch, InputText } from './input';

const testId = 'ui-input';

describe('(Component) Input', () => {
  it('should apply the className "test"', () => {
    const { getByTestId } = render(
      <InputText className="test" onChange={() => {}} />,
    );
    expect(getByTestId(testId)).toHaveClass('test');
  });

  it('should apply the size prop', () => {
    const { getByTestId } = render(
      <InputText size="big" onChange={() => {}} />,
    );
    expect(getByTestId(testId)).toHaveClass('input--big');
  });

  it('should apply the label prop', () => {
    const { getByText } = render(
      <InputText label="Username" onChange={() => {}} />,
    );
    expect(getByText('Username')).toBeInTheDocument();
  });

  it('should apply the error prop', () => {
    const { getByText } = render(
      <InputText error="Invalid input" onChange={() => {}} />,
    );
    expect(getByText('Invalid input')).toBeInTheDocument();
  });

  it('should call onChange when input value changes', () => {
    const onChange = vi.fn();
    const { getByTestId } = render(
      <InputText onChange={onChange} value="some" />,
    );
    fireEvent.change(getByTestId(testId), { target: { value: 'test' } });
    expect(onChange).toHaveBeenCalled();
  });

  it('should call onKeyDown when a key is pressed', () => {
    const onKeyDown = vi.fn();
    const { getByTestId } = render(
      <InputText onKeyDown={onKeyDown} onChange={() => {}} />,
    );
    fireEvent.keyDown(getByTestId(testId), { key: 'Enter' });
    expect(onKeyDown).toHaveBeenCalled();
  });

  it('should be disabled when disabled prop is true', () => {
    const { getByTestId } = render(<InputText disabled onChange={() => {}} />);
    expect(getByTestId(testId)).toBeDisabled();
  });

  it('should have autoFocus when autoFocus prop is true', () => {
    const { getByTestId } = render(<InputText autoFocus onChange={() => {}} />);
    expect(getByTestId(testId)).toHaveFocus();
  });

  it.each([
    [InputText, 'text'],
    [InputNumber, 'number'],
    [InputPassword, 'password'],
    [InputSearch, 'search'],
  ])('should render the %s input type', (InputComponent, type) => {
    const { getByTestId } = render(<InputComponent onChange={() => {}} />);
    expect(getByTestId(testId)).toHaveAttribute('type', type);
  });

  it('should apply number-specific props', () => {
    const { getByTestId } = render(
      <InputNumber min={1} max={10} step={0.5} onChange={() => {}} />,
    );
    expect(getByTestId(testId)).toHaveAttribute('min', '1');
    expect(getByTestId(testId)).toHaveAttribute('max', '10');
    expect(getByTestId(testId)).toHaveAttribute('step', '0.5');
  });

  it('should apply text-specific props', () => {
    const { getByTestId } = render(
      <InputText
        minLength={2}
        maxLength={12}
        pattern="[A-Za-z]+"
        onChange={() => {}}
      />,
    );
    expect(getByTestId(testId)).toHaveAttribute('minLength', '2');
    expect(getByTestId(testId)).toHaveAttribute('maxLength', '12');
    expect(getByTestId(testId)).toHaveAttribute('pattern', '[A-Za-z]+');
  });
});
