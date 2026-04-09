import { normalizeValue, restoreCaretPosition } from './content-editor.utils';

describe('(Function) normalizeValue', () => {
  it('should replace b tags with strong tags', () => {
    const value = '<b>test</b>';
    const expected = '<strong>test</strong>';
    expect(normalizeValue(value)).toEqual(expected);
  });
  it('should replace i tags with em tags', () => {
    const value = '<i>test</i>';
    const expected = '<em>test</em>';
    expect(normalizeValue(value)).toEqual(expected);
  });
  it('should replace <br> tags with <br /> tags', () => {
    const value = 'line1<br>line2';
    const expected = 'line1<br />line2';
    expect(normalizeValue(value)).toEqual(expected);
  });
  it('should replace <td>&nbsp;</td> tags with <td></td> tags', () => {
    const value = '<td>&nbsp;</td>';
    const expected = '<td></td>';
    expect(normalizeValue(value)).toEqual(expected);
  });
  it('should replace <td class="td-border-bottom">&nbsp;</td> tags with <td class="td-border-bottom"></td> tags', () => {
    const value = '<td class="td-border-bottom">&nbsp;</td>';
    const expected = '<td class="td-border-bottom"></td>';
    expect(normalizeValue(value)).toEqual(expected);
  });
  it('should replace colspan="1" with an empty string', () => {
    const value = '<td colspan="1">test</td>';
    const expected = '<td>test</td>';
    expect(normalizeValue(value)).toEqual(expected);
  });
});

describe('(Function) restoreCaretPosition', () => {
  it('should not throw when ref.current is null', () => {
    const ref = { current: null };
    expect(() => restoreCaretPosition(ref as any, 0)).not.toThrow();
  });

  it('should focus the textarea element', () => {
    const mockTextarea = {
      focus: vi.fn(),
      selectionStart: 0,
      selectionEnd: 0,
    };
    const ref = { current: mockTextarea as any };

    restoreCaretPosition(ref, 5);

    expect(mockTextarea.focus).toHaveBeenCalled();
  });

  it('should set selectionStart and selectionEnd to the given position', () => {
    const mockTextarea = {
      focus: vi.fn(),
      selectionStart: 0,
      selectionEnd: 0,
    };
    const ref = { current: mockTextarea as any };

    restoreCaretPosition(ref, 10);

    expect(mockTextarea.selectionStart).toBe(10);
    expect(mockTextarea.selectionEnd).toBe(10);
  });
});
