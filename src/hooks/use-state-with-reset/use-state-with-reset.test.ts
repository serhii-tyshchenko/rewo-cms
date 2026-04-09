import { act, renderHook } from '@testing-library/react';

import useStateWithReset from './use-state-with-reset';

describe('(Hook) useStateWithReset', () => {
  it('should initialize with the given initial value', () => {
    const { result } = renderHook(() => useStateWithReset('test'));
    const [state] = result.current;
    expect(state).toBe('test');
  });

  it('should update the state when setState is called', () => {
    const { result } = renderHook(() => useStateWithReset(0));
    const [, setState] = result.current;

    act(() => {
      setState(42);
    });

    const [state] = result.current;
    expect(state).toBe(42);
  });

  it('should reset the state to the initial value', () => {
    const { result } = renderHook(() => useStateWithReset('init'));
    const [, setState, reset] = result.current;

    act(() => {
      setState('changed');
    });

    expect(result.current[0]).toBe('changed');

    act(() => {
      reset();
    });

    expect(result.current[0]).toBe('init');
  });

  it('should work with undefined as initial value', () => {
    const { result } = renderHook(() => useStateWithReset());
    const [state, setState, reset] = result.current;

    expect(state).toBeUndefined();

    act(() => {
      setState('value');
    });

    expect(result.current[0]).toBe('value');

    act(() => {
      reset();
    });

    expect(result.current[0]).toBeUndefined();
  });
});
