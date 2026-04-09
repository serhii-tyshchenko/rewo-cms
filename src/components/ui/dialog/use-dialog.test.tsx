import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useDialog } from './use-dialog';

describe('(Hook) useDialog', () => {
  it('should return a ref with initial value null', () => {
    const { result } = renderHook(() => useDialog(() => {}));
    expect(result.current.current).toBeNull();
  });

  it('should call onClose when Escape key is pressed', () => {
    const onClose = vi.fn();
    renderHook(() => useDialog(onClose));

    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should not call onClose for other keys', () => {
    const onClose = vi.fn();
    renderHook(() => useDialog(onClose));

    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    document.dispatchEvent(event);

    expect(onClose).not.toHaveBeenCalled();
  });

  it('should clean up event listener on unmount', () => {
    const onClose = vi.fn();
    const { unmount } = renderHook(() => useDialog(onClose));

    unmount();

    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);

    expect(onClose).not.toHaveBeenCalled();
  });
});
