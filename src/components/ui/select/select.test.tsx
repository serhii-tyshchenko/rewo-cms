import { fireEvent, render } from '@testing-library/react';

import Select from './select';

const testId = 'ui-select';

const options = [
  { label: 'Option 1', value: 'option1', disabled: false },
  { label: 'Option 2', value: 'option2', disabled: true },
  { label: 'Option 3', value: 'option3', disabled: false },
];

describe('(Component) Select', () => {
  it('should apply the className "test"', () => {
    const { getByTestId } = render(
      <Select options={options} className="test" onChange={() => {}} />,
    );
    expect(getByTestId(testId)).toHaveClass('test');
  });

  it('should apply the size prop', () => {
    const { getByTestId } = render(
      <Select options={options} size="big" onChange={() => {}} />,
    );
    expect(getByTestId(testId)).toHaveClass('select--big');
  });

  it('should apply the title prop', () => {
    const { getByTestId } = render(
      <Select options={options} title="Select an option" onChange={() => {}} />,
    );
    expect(getByTestId(testId)).toHaveAttribute('title', 'Select an option');
  });

  it('should call onChange when an option is selected', () => {
    const onChange = vi.fn();
    const { getByTestId } = render(
      <Select options={options} onChange={onChange} />,
    );
    fireEvent.change(getByTestId(testId), { target: { value: 'option2' } });
    expect(onChange).toHaveBeenCalled();
  });

  it('should be disabled when disabled prop is true', () => {
    const { getByTestId } = render(
      <Select options={options} disabled onChange={() => {}} />,
    );
    expect(getByTestId(testId)).toBeDisabled();
  });

  it('should display an error message when error prop is provided', () => {
    const { getByTestId, getByText } = render(
      <Select options={options} error="Invalid option" onChange={() => {}} />,
    );
    expect(getByTestId(testId)).toHaveClass('select--error');
    expect(getByText('Invalid option')).toBeInTheDocument();
  });
});
