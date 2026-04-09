export const getSelection = (ref) => ({
  start: ref.current?.selectionStart,
  end: ref.current?.selectionEnd,
  value: ref.current?.value?.substring(
    ref.current?.selectionStart,
    ref.current?.selectionEnd,
  ),
});
