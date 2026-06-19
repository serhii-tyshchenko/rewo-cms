import { useSelector } from 'react-redux';

import { renderHook } from '@testing-library/react';

import { useSystemTheme } from '@hooks';

import { selectSettings } from '@store/selectors';

import { useTheme } from './use-theme';

vi.mock('react-redux', async () => {
  const actual =
    await vi.importActual<typeof import('react-redux')>('react-redux');

  return {
    ...actual,
    useSelector: vi.fn(),
  };
});

vi.mock('@hooks', () => ({
  useSystemTheme: vi.fn(),
}));

describe('(Hook) useTheme', () => {
  const mockedUseSelector = vi.mocked(useSelector);
  const mockedUseSystemTheme = vi.mocked(useSystemTheme);

  afterEach(() => {
    vi.clearAllMocks();
    document.documentElement.removeAttribute('data-theme');
  });

  it('returns selected theme and applies explicit theme to data-theme', () => {
    mockedUseSelector.mockReturnValue({ theme: 'dark' });
    mockedUseSystemTheme.mockReturnValue('light');

    const { result } = renderHook(() => useTheme());

    expect(result.current).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(mockedUseSelector).toHaveBeenCalledWith(selectSettings);
  });

  it('resolves system theme when selected theme is system', () => {
    mockedUseSelector.mockReturnValue({ theme: 'system' });
    mockedUseSystemTheme.mockReturnValue('light');

    renderHook(() => useTheme());

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('updates data-theme when selected theme changes', () => {
    mockedUseSelector.mockReturnValue({ theme: 'light' });
    mockedUseSystemTheme.mockReturnValue('dark');

    const { rerender } = renderHook(() => useTheme());
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    mockedUseSelector.mockReturnValue({ theme: 'system' });
    rerender();

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
