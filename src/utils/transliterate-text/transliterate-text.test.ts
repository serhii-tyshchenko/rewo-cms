import { transliterateText } from './transliterate-text';

describe('transliterateText function', () => {
  it('should transliterate text correctly', () => {
    const input = 'Привіт, світ!';
    const expectedOutput = 'pryvit, svit!';
    const result = transliterateText(input);

    expect(result).toEqual(expectedOutput);
  });

  it('should handle empty string', () => {
    const input = '';
    const expectedOutput = '';
    const result = transliterateText(input);

    expect(result).toEqual(expectedOutput);
  });

  it('should handle non-transliterate characters', () => {
    const input = '12345!@#$%';
    const expectedOutput = '12345!@#$%';
    const result = transliterateText(input);

    expect(result).toEqual(expectedOutput);
  });
  it('should handle mixed characters', () => {
    const input = 'Hello, світ!';
    const expectedOutput = 'hello, svit!';
    const result = transliterateText(input);

    expect(result).toEqual(expectedOutput);
  });
  it('should handle ь character correctly', () => {
    const input = 'Громадянська осьвіта';
    const expectedOutput = 'hromadianska osvita';
    const result = transliterateText(input);

    expect(result).toEqual(expectedOutput);
  });
});
