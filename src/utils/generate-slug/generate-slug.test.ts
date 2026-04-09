import { vi } from 'vitest';

import * as transliterateModule from '../transliterate-text';
import { generateSlug } from './generate-slug';

describe('generateSlug', () => {
  it('should generate a slug with hyphens instead of spaces', () => {
    vi.spyOn(transliterateModule, 'transliterateText').mockReturnValue(
      'hello world',
    );
    expect(generateSlug('Hello World')).toBe('hello-world');
  });

  it('should handle multiple spaces', () => {
    vi.spyOn(transliterateModule, 'transliterateText').mockReturnValue(
      'foo bar baz',
    );
    expect(generateSlug('foo bar baz')).toBe('foo-bar-baz');
  });

  it('should return lowercase slug after transliteration', () => {
    vi.spyOn(transliterateModule, 'transliterateText').mockReturnValue(
      'test title',
    );
    expect(generateSlug('Test Title')).toBe('test-title');
  });

  it('should handle single word', () => {
    vi.spyOn(transliterateModule, 'transliterateText').mockReturnValue(
      'single',
    );
    expect(generateSlug('single')).toBe('single');
  });

  it('should handle empty string', () => {
    vi.spyOn(transliterateModule, 'transliterateText').mockReturnValue('');
    expect(generateSlug('')).toBe('');
  });
});
