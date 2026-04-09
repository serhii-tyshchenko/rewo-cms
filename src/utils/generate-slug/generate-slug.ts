import { transliterateText } from '../transliterate-text';

/**
 * Generates a URL-friendly slug from a given title by transliterating the text and replacing spaces with hyphens.
 *
 * @param {string} title - The input title to be converted into a slug.
 * @returns {string} A URL-friendly slug generated from the input title.
 */
export const generateSlug = (title: string): string =>
  transliterateText(title).split(' ').join('-');
