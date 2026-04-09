import { act, renderHook } from '@testing-library/react';

import useModals from './use-modals';

describe('(Hook) useModals', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useModals());
    expect(result.current.modal).toBe(undefined);
  });

  it('should initialize with provided initial state', () => {
    const { result } = renderHook(() => useModals('login'));
    expect(result.current.modal).toBe('login');
  });

  it('should open a modal', () => {
    const { result } = renderHook(() => useModals());
    act(() => {
      result.current.openModal('settings');
    });
    expect(result.current.modal).toBe('settings');
  });

  it('should close a modal', () => {
    const { result } = renderHook(() => useModals('profile'));
    act(() => {
      result.current.closeModal();
    });
    expect(result.current.modal).toBe(undefined);
  });
});
