/**
 * prettyNumber formats a number with a specified divider (default is a space) for thousands separation.
 *
 * @param {number} num - The number to be formatted.
 * @param {string} [divider=' '] - The character used to separate thousands. Defaults to a space.
 * @returns {string} The formatted number as a string with the specified divider for thousands separation.
 */
export const prettyNumber = (num: number, divider: string = ' '): string =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, divider); // O(N)
