/**
 * Counts the number of words in a given HTML string by stripping out HTML tags and non-word characters.
 *
 * @param {string} html - The HTML string to count words from.
 * @returns {number} The total number of words in the input string.
 */
export const countWords = (html: string): number =>
  html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/[^\p{L}\s'-]/gu, '')
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 1).length;
