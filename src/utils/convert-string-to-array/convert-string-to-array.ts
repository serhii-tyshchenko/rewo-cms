/**
 * Converts a comma-separated string into an array of numbers.
 * Non-numeric values are filtered out.
 *
 * @param input - The comma-separated string to convert.
 * @returns An array of numbers.
 */
export const convertStringToArray = (input: string): number[] =>
  input
    .split(',')
    .map((item) => Number(item.trim()))
    .filter(Boolean);
