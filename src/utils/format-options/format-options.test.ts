import { formatOptions } from './format-options';

describe('formatOptions', () => {
  it('should return empty array when options is undefined or null', () => {
    expect(formatOptions({ options: undefined as any })).toEqual([]);
    expect(formatOptions({ options: null as any })).toEqual([]);
  });

  it('should map options to { value, label, title } and sort alphabetically by name', () => {
    const input = [
      { id: 3, name: 'oranges', description: 'citrus fruit' },
      { id: 1, name: 'apples', description: 'red or green fruit' },
      { id: 2, name: 'bananas', description: 'yellow fruit' },
    ];
    const result = formatOptions({ options: input, withTitle: true });
    expect(result).toEqual([
      { value: '1', label: 'apples', title: 'red or green fruit' },
      { value: '2', label: 'bananas', title: 'yellow fruit' },
      { value: '3', label: 'oranges', title: 'citrus fruit' },
    ]);
  });

  it('should include a placeholder as the first item when provided (disabled and value is empty string)', () => {
    const input = [
      { id: 'a', name: '1 one' },
      { id: 'b', name: '3 three' },
    ];
    const result = formatOptions({
      options: input,
      placeholder: 'Select an option',
    });
    expect(result[0]).toEqual({
      value: '',
      label: 'Select an option',
      disabled: true,
    });
    expect(result.slice(1)).toEqual([
      { value: 'a', label: '1 one' },
      { value: 'b', label: '3 three' },
    ]);
  });

  it('should return only the placeholder when options is an empty array and placeholder is provided', () => {
    const result = formatOptions({ options: [], placeholder: 'Nothing' });
    expect(result).toEqual([{ value: '', label: 'Nothing', disabled: true }]);
  });
});
