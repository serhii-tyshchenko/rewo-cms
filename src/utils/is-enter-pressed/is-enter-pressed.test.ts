import isEnterPressed from './is-enter-pressed';

describe('isEnterPressed', () => {
  it('returns true when e.key is "Enter"', () => {
    const event = { key: 'Enter', keyCode: 0 };
    expect(isEnterPressed(event)).toBe(true);
  });

  it('returns true when e.keyCode is 13', () => {
    const event = { key: '', keyCode: 13 };
    expect(isEnterPressed(event)).toBe(true);
  });

  it('returns false for other keys', () => {
    const event = { key: 'a', keyCode: 65 };
    expect(isEnterPressed(event)).toBe(false);
  });

  it('returns false for other keyCodes', () => {
    const event = { key: '', keyCode: 27 };
    expect(isEnterPressed(event)).toBe(false);
  });
});
