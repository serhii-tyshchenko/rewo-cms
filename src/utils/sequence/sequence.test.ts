import { vi } from 'vitest';

import { sequence } from './sequence';

describe('sequence', () => {
  it('should call all functions with the provided value', () => {
    const fn1 = vi.fn();
    const fn2 = vi.fn();
    const run = sequence(fn1, fn2);

    run('value');

    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledTimes(1);
    expect(fn1).toHaveBeenCalledWith('value');
    expect(fn2).toHaveBeenCalledWith('value');
  });

  it('should call functions in the same order they were provided', () => {
    const calls: string[] = [];
    const fn1 = vi.fn(() => calls.push('fn1'));
    const fn2 = vi.fn(() => calls.push('fn2'));
    const fn3 = vi.fn(() => calls.push('fn3'));

    sequence(fn1, fn2, fn3)(123);

    expect(calls).toEqual(['fn1', 'fn2', 'fn3']);
  });

  it('should return a callable function when no functions are provided', () => {
    const run = sequence<number>();

    expect(() => run(42)).not.toThrow();
  });

  it('should support multiple invocations', () => {
    const fn = vi.fn();
    const run = sequence(fn);

    run(1);
    run(2);

    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenNthCalledWith(1, 1);
    expect(fn).toHaveBeenNthCalledWith(2, 2);
  });

  it('should pass the same object reference to each function', () => {
    const fn1 = vi.fn();
    const fn2 = vi.fn();
    const value = { id: 1 };

    sequence(fn1, fn2)(value);

    expect(fn1.mock.calls[0][0]).toBe(value);
    expect(fn2.mock.calls[0][0]).toBe(value);
  });
});
