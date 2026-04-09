import { normalizeString } from './normalize-string';

describe('normalizeString', () => {
  it('should replace HTML entities with corresponding characters', () => {
    expect(normalizeString('&#8217;')).toBe("'");
    expect(normalizeString('&#038;')).toBe('&');
    expect(normalizeString('&#8230;')).toBe('...');
    expect(normalizeString('&#8221;')).toBe('"');
  });

  it('should return the original string if no HTML entities are present', () => {
    expect(normalizeString('Hello World')).toBe('Hello World');
  });
});
