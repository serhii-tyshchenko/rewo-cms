import { truncate } from './truncate';

describe('truncate', () => {
  it('should truncate a string longer than n and add "..."', () => {
    expect(truncate('Hello World', 6)).toBe('Hello...');
  });

  it('should return the original string if its length is less than or equal to n', () => {
    expect(truncate('Hello', 5)).toBe('Hello');
    expect(truncate('Hi', 10)).toBe('Hi');
  });

  it('should handle empty string', () => {
    expect(truncate('', 3)).toBe('');
  });

  it('should handle n = 0', () => {
    expect(truncate('Hello', 0)).toBe('Hell...');
  });

  it('should handle n = 1', () => {
    expect(truncate('Hello', 1)).toBe('...');
  });

  it('should handle undefined or null input gracefully', () => {
    // @ts-expect-error as the function is expected to handle undefined or null, we can ignore TypeScript errors here
    expect(truncate(undefined, 5)).toBe(undefined);
    // @ts-expect-error as  the function is expected to handle undefined or null, we can ignore TypeScript errors here
    expect(truncate(null, 5)).toBe(null);
  });
});
