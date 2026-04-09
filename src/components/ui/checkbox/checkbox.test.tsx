import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Checkbox from './checkbox';

describe('(Component) Checkbox', () => {
  it('should render with the correct props', () => {
    const mockOnChange = vi.fn();
    const { getByLabelText } = render(
      <Checkbox
        name="myCheckbox"
        value="checkboxValue"
        onChange={mockOnChange}
        className="custom-class"
        required
        disabled={false}
        label="My Checkbox"
        style={{ color: 'red' }}
        checked
      />
    );

    const checkbox = getByLabelText('My Checkbox');

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('name', 'myCheckbox');
    expect(checkbox).toHaveAttribute('value', 'checkboxValue');
    expect(checkbox).toHaveClass('custom-class');
    expect(checkbox).toBeRequired();
    expect(checkbox).not.toBeDisabled();
    expect(checkbox).toHaveStyle('color: rgb(255, 0, 0)');
    expect(checkbox).toBeChecked();
  });

  it('should call onChange function when checkbox is clicked', async () => {
    const mockOnChange = vi.fn();
    const { getByLabelText } = render(
      <Checkbox
        name="myCheckbox"
        value="checkboxValue"
        onChange={mockOnChange}
        label="My Checkbox"
      />
    );

    const checkbox = getByLabelText('My Checkbox');
    await userEvent.click(checkbox);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
