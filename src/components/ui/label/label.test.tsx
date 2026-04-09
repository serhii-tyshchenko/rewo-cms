import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Label from './label';

describe('Label', () => {
  it('renders children correctly', () => {
    render(<Label forId="test-id">Test Label</Label>);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('sets htmlFor attribute correctly', () => {
    render(<Label forId="test-id">Label</Label>);
    expect(screen.getByText('Label').closest('label')).toHaveAttribute(
      'for',
      'test-id',
    );
  });

  it('applies required class when required is true', () => {
    render(
      <Label forId="test-id" required>
        Label
      </Label>,
    );
    const label = screen.getByText('Label').closest('label');
    expect(label?.className).toMatch(/label--required/);
  });

  it('applies size class based on size prop', () => {
    render(
      <Label forId="test-id" size="small">
        Label
      </Label>,
    );
    const label = screen.getByText('Label').closest('label');
    expect(label?.className).toMatch(/label--small/);
  });

  it('applies custom className', () => {
    render(
      <Label forId="test-id" className="custom-class">
        Label
      </Label>,
    );
    const label = screen.getByText('Label').closest('label');
    expect(label?.className).toMatch(/custom-class/);
  });

  it('uses default props when not provided', () => {
    render(<Label forId="test-id">Label</Label>);
    const label = screen.getByText('Label').closest('label');
    expect(label?.className).toMatch(/label--normal/);
    expect(label?.className).not.toMatch(/label--required/);
  });
});
