import { prettyNumber } from './pretty-number';

describe('prettyNumber', () => {
  it('formats thousands with a space by default', () => {
    expect(prettyNumber(1234567)).toBe('1 234 567');
  });

  it('returns numbers below 1000 unchanged', () => {
    expect(prettyNumber(0)).toBe('0');
    expect(prettyNumber(7)).toBe('7');
    expect(prettyNumber(999)).toBe('999');
  });

  it('formats negative numbers correctly', () => {
    expect(prettyNumber(-1234567)).toBe('-1 234 567');
  });

  it('formats decimal numbers and keeps fractional part unchanged', () => {
    expect(prettyNumber(1234567.89)).toBe('1 234 567.89');
  });

  it('uses a custom divider when provided', () => {
    expect(prettyNumber(1234567, ',')).toBe('1,234,567');
    expect(prettyNumber(1234567, '_')).toBe('1_234_567');
  });

  it('supports an empty divider', () => {
    expect(prettyNumber(1234567, '')).toBe('1234567');
  });

  it('handles very large integers', () => {
    expect(prettyNumber(1234567890123)).toBe('1 234 567 890 123');
  });
});
