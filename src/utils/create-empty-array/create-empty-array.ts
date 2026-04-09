/**
 * Generates an array of a specified length filled with empty strings.
 *
 * @param {number} length - The desired length of the array.
 * @returns {string[]} An array of the specified length, where each element is an empty string.
 */
export const createEmptyArray = (length: number): string[] =>
  Array.from({ length }, () => '');
