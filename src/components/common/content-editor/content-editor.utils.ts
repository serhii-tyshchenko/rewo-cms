export const restoreCaretPosition = (
  ref: React.RefObject<HTMLTextAreaElement>,
  position: number,
): void => {
  if (!ref.current) return;
  ref.current.focus();
  // eslint-disable-next-line no-param-reassign
  ref.current.selectionStart = position;
  // eslint-disable-next-line no-param-reassign
  ref.current.selectionEnd = position;
};

export const normalizeValue = (value: string) =>
  value
    .replace(/<b>/g, '<strong>')
    .replace(/<\/b>/g, '</strong>')
    .replace(/<br>/g, '<br />')
    .replace(/<i>/g, '<em>')
    .replace(/<\/i>/g, '</em>')
    .replace(/<td>&nbsp;<\/td>/g, '<td></td>')
    .replace(
      /<td class="td-border-bottom">&nbsp;<\/td>/g,
      '<td class="td-border-bottom"></td>',
    )
    .replace(/ colspan="1"/g, '');
