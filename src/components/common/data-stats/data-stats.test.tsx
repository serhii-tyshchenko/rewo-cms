import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { prettyNumber } from '@utils';

import { DataStats } from './data-stats';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('@utils', () => ({
  prettyNumber: vi.fn((value: number) => `formatted-${value}`),
}));

describe('(Component) DataStats', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render translated labels and formatted values', () => {
    render(<DataStats total={1234} totalPages={56} />);

    expect(
      screen.getByText(/total\s*:/i, {
        selector: 'li',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/pages\s*:/i, {
        selector: 'li',
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('formatted-1234')).toBeInTheDocument();
    expect(screen.getByText('formatted-56')).toBeInTheDocument();
  });

  it('should call prettyNumber with total and totalPages', () => {
    render(<DataStats total={999} totalPages={12} />);

    expect(prettyNumber).toHaveBeenCalledTimes(2);
    expect(prettyNumber).toHaveBeenNthCalledWith(1, 999);
    expect(prettyNumber).toHaveBeenNthCalledWith(2, 12);
  });

  it('should render the separator between stats', () => {
    const { container } = render(<DataStats total={10} totalPages={2} />);

    expect(container.textContent).toContain('/');
  });
});
