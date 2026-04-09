import { countWords } from './count-words';

describe('(Function) countWords', () => {
  it('counts words in plain text', () => {
    expect(countWords('Hello world')).toBe(2);
  });

  it('counts words in HTML string', () => {
    expect(countWords('<p>Hello <b>world</b></p>')).toBe(2);
  });

  it('handles multiple spaces and HTML entities', () => {
    expect(countWords('Hello&nbsp;&nbsp;world')).toBe(2);
  });

  it('ignores punctuation', () => {
    expect(countWords('Hello, world!')).toBe(2);
  });

  it('handles empty string', () => {
    expect(countWords('')).toBe(0);
  });

  it('handles string with only HTML tags', () => {
    expect(countWords('<div><br></div>')).toBe(0);
  });

  it('handles hyphenated and apostrophized words', () => {
    expect(countWords("It's a well-known fact")).toBe(3);
  });

  it('handles mixed content', () => {
    expect(countWords('<h1>Title</h1><p>This is a test.</p>')).toBe(4);
  });
});
