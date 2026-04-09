/**
 * Truncates a string to a specified length and appends an ellipsis if the string exceeds that length.
 *
 * @param {string} str - The input string to be truncated.
 * @param {number} [n=1] - The maximum length of the truncated string, including the ellipsis. Defaults to 1.
 * @returns {string} The truncated string with an ellipsis if it exceeds the specified length, or the original string if it does not.
 */
export const truncate = (str: string, n: number = 1): string =>
  str?.length > n ? `${str.slice(0, n - 1)}...` : str;
