import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import FormGroup from './form-group';

// Mock getClassName utility
vi.mock('utils', () => ({
  getClassName: (...args: string[]) => args.filter(Boolean).join(' '),
}));

describe('(Component) FormGroup', () => {
  it('renders children correctly', () => {
    render(
      <FormGroup>
        <span>Test Child</span>
      </FormGroup>
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('applies default className and testId', () => {
    render(<FormGroup />);
    const div = screen.getByTestId('ui-form-group');
    expect(div).toHaveClass('mb-3');
  });

  it('appends custom className', () => {
    render(<FormGroup className="custom-class" />);
    const div = screen.getByTestId('ui-form-group');
    expect(div).toHaveClass('mb-3');
    expect(div).toHaveClass('custom-class');
  });

  it('uses custom testId if provided', () => {
    render(<FormGroup testId="custom-id" />);
    expect(screen.getByTestId('custom-id')).toBeInTheDocument();
  });

  it('renders without children', () => {
    render(<FormGroup />);
    const div = screen.getByTestId('ui-form-group');
    expect(div).toBeEmptyDOMElement();
  });
});
