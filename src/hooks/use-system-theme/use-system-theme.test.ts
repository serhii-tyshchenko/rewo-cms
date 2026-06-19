import { act, renderHook } from '@testing-library/react';

import { useSystemTheme } from './use-system-theme';

describe('(Hook) useSystemTheme', () => {
  const originalMatchMedia = window.matchMedia;

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    vi.restoreAllMocks();
  });

  const setupMatchMedia = (initialIsDark: boolean) => {
    let isDark = initialIsDark;
    let changeListener: ((event: MediaQueryListEvent) => void) | undefined;

    const addEventListener = vi.fn(
      (_event: 'change', listener: (event: MediaQueryListEvent) => void) => {
        changeListener = listener;
      },
    );

    const removeEventListener = vi.fn(
      (_event: 'change', listener: (event: MediaQueryListEvent) => void) => {
        if (changeListener === listener) {
          changeListener = undefined;
        }
      },
    );

    const mediaQueryList = {
      get matches() {
        return isDark;
      },
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addEventListener,
      removeEventListener,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as unknown as MediaQueryList;

    const matchMediaMock = vi.fn().mockReturnValue(mediaQueryList);
    window.matchMedia = matchMediaMock;

    return {
      setDarkMode: (value: boolean) => {
        isDark = value;
      },
      emitChange: () => {
        if (!changeListener) {
          return;
        }

        changeListener({ matches: isDark } as MediaQueryListEvent);
      },
      addEventListener,
      removeEventListener,
      matchMediaMock,
    };
  };

  it('returns light when system prefers light', () => {
    setupMatchMedia(false);

    const { result } = renderHook(() => useSystemTheme());

    expect(result.current).toBe('light');
  });

  it('returns dark when system prefers dark', () => {
    setupMatchMedia(true);

    const { result } = renderHook(() => useSystemTheme());

    expect(result.current).toBe('dark');
  });

  it('updates value when media query change event is emitted', () => {
    const { setDarkMode, emitChange } = setupMatchMedia(false);

    const { result } = renderHook(() => useSystemTheme());
    expect(result.current).toBe('light');

    act(() => {
      setDarkMode(true);
      emitChange();
    });

    expect(result.current).toBe('dark');
  });

  it('subscribes on mount and unsubscribes on unmount', () => {
    const { addEventListener, removeEventListener } = setupMatchMedia(false);

    const { unmount } = renderHook(() => useSystemTheme());

    expect(addEventListener).toHaveBeenCalledTimes(1);
    expect(addEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function),
    );

    unmount();

    expect(removeEventListener).toHaveBeenCalledTimes(1);
    expect(removeEventListener).toHaveBeenCalledWith(
      'change',
      addEventListener.mock.calls[0][1],
    );
  });
});
