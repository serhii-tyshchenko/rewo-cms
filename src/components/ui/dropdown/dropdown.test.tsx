import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Dropdown from './dropdown';

describe('(Component) Dropdown', () => {
  it('should render with default props', () => {
    const handleToggle = vi.fn();
    render(<Dropdown onToggle={handleToggle} />);
    expect(screen.getByTestId('ui-dropdown')).toBeInTheDocument();
    expect(screen.getByTitle('Toggle dropdown')).toBeInTheDocument();
    expect(screen.queryByText('cancel')).not.toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const handleToggle = vi.fn();
    render(<Dropdown onToggle={handleToggle} className="custom-class" />);
    expect(screen.getByTestId('ui-dropdown').className).toMatch(/custom-class/);
  });

  it('should render children when opened', () => {
    const handleToggle = vi.fn();
    render(
      <Dropdown onToggle={handleToggle} opened>
        <div>Dropdown Content</div>
      </Dropdown>,
    );
    expect(screen.getByText('Dropdown Content')).toBeInTheDocument();
  });

  it('should not render children when not opened', () => {
    const handleToggle = vi.fn();
    render(
      <Dropdown onToggle={handleToggle}>
        <div>Dropdown Content</div>
      </Dropdown>,
    );
    expect(screen.queryByText('Dropdown Content')).not.toBeInTheDocument();
  });

  it('should call onToggle when IconButton is clicked', () => {
    const handleToggle = vi.fn();
    render(<Dropdown onToggle={handleToggle} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleToggle).toHaveBeenCalledTimes(1);
  });

  it('should use custom toggleIcon and title', () => {
    const handleToggle = vi.fn();
    render(
      <Dropdown
        onToggle={handleToggle}
        toggleIcon="custom-icon"
        title="Custom Title"
      />,
    );
    expect(screen.getByTitle('Custom Title')).toBeInTheDocument();
  });

  it('should show "cancel" icon when opened', () => {
    const handleToggle = vi.fn();
    render(<Dropdown onToggle={handleToggle} opened />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should set custom testId', () => {
    const handleToggle = vi.fn();
    render(<Dropdown onToggle={handleToggle} testId="custom-dropdown" />);
    expect(screen.getByTestId('custom-dropdown')).toBeInTheDocument();
  });
});
