import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Pill from './pill';

vi.mock('@utils', () => ({
  getClassName: (...args: any[]) => args.filter(Boolean).join(' '),
}));

describe('(Component) Pill', () => {
  it('renders with default props', () => {
    render(<Pill />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Pill className="custom-class" />);
    expect(screen.getByText('Click me').parentElement).toHaveClass(
      'custom-class',
    );
  });

  it('renders label prop', () => {
    render(<Pill label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('applies size class', () => {
    render(<Pill size="small" />);
    expect(screen.getByText('Click me').parentElement?.className).toContain(
      'pill--small',
    );
  });

  it('disables button when disabled', () => {
    render(<Pill disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not render button when noButton is true', () => {
    render(<Pill noButton />);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('calls onClick with value when button is clicked', () => {
    const onClick = vi.fn();
    render(<Pill onClick={onClick} value="val" />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledWith('val');
  });

  it('does not call onClick if value is falsy', () => {
    const onClick = vi.fn();
    render(<Pill onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('sets button title and aria-label', () => {
    render(<Pill removeTitle="Remove me" />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('title', 'Remove me');
    expect(btn).toHaveAttribute('aria-label', 'Remove me');
  });

  it('applies icon class to button', () => {
    render(<Pill icon="icon-test" />);
    expect(screen.getByRole('button').className).toContain('icon-test');
  });
});
