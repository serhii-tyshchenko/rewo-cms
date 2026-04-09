import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import CollapseButton from './collapse-button';

vi.mock('@components/ui', () => ({
  IconButton: (props: any) => (
    <button
      data-testid={props.testId ?? 'ui-icon-button'}
      title={props.title}
      className={props.className}
      onClick={props.onClick}
      data-size={props.size}
      type={props.type}
      aria-label={props.title}
      disabled={props.disabled}
      autoFocus={props.autoFocus}
    >
      {props.icon}
    </button>
  ),
}));

const mockDic = { expand: 'Expand', collapse: 'Collapse' };
vi.mock('@hooks', () => ({
  useLocalization: () => mockDic,
}));

// Mock getClassName
vi.mock('@utils', () => ({
  getClassName: (...args: string[]) => args.filter(Boolean).join(' '),
}));

describe('(Component) CollapseButton', () => {
  const onClick = vi.fn();

  beforeEach(() => {
    onClick.mockClear();
  });

  it('renders with default props and collapsed=false', () => {
    render(
      <CollapseButton collapsed={false} onClick={onClick} direction="down" />,
    );
    const button = screen.getByTestId('ui-icon-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('title', 'collapse');
    expect(button).toHaveClass('rotate-0');
    expect(button).toHaveAttribute('data-size', 'small');
  });

  it('renders with collapsed=true and correct title', () => {
    render(<CollapseButton collapsed onClick={onClick} direction="down" />);
    const button = screen.getByTestId('ui-icon-button');
    expect(button).toHaveAttribute('title', 'expand');
    expect(button).toHaveClass('rotate-180');
  });

  it('calls onClick when clicked', () => {
    render(
      <CollapseButton collapsed={false} onClick={onClick} direction="down" />,
    );
    const button = screen.getByTestId('ui-icon-button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(
      <CollapseButton
        collapsed={false}
        onClick={onClick}
        direction="down"
        className="custom-class"
      />,
    );
    const button = screen.getByTestId('ui-icon-button');
    expect(button).toHaveClass('rotate-0');
    expect(button).toHaveClass('custom-class');
  });

  it('applies correct rotation for each direction when collapsed=false', () => {
    const directions = {
      up: 'rotate-180',
      down: 'rotate-0',
      left: 'rotate-90',
      right: 'rotate-270',
    } as const;
    Object.entries(directions).forEach(([direction, expectedClass]) => {
      render(
        <CollapseButton
          collapsed={false}
          onClick={onClick}
          direction={direction as any}
        />,
      );
      const button = screen.getByTestId('ui-icon-button');
      expect(button).toHaveClass(expectedClass);
      cleanup();
    });
  });

  it('applies correct rotation for each direction when collapsed=true', () => {
    const directions = {
      up: 'rotate-0',
      down: 'rotate-180',
      left: 'rotate-270',
      right: 'rotate-90',
    } as const;
    Object.entries(directions).forEach(([direction, expectedClass]) => {
      render(
        <CollapseButton
          collapsed
          onClick={onClick}
          direction={direction as any}
        />,
      );
      const button = screen.getByTestId('ui-icon-button');
      expect(button).toHaveClass(expectedClass);
      cleanup();
    });
  });

  it('passes size prop to IconButton', () => {
    render(
      <CollapseButton
        collapsed={false}
        onClick={onClick}
        direction="down"
        size="big"
      />,
    );
    const button = screen.getByTestId('ui-icon-button');
    expect(button).toHaveAttribute('data-size', 'big');
  });
});
