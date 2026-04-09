const TRANSLITERATIONS_CONFIG = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'h',
  ґ: 'g',
  д: 'd',
  е: 'e',
  є: 'ie',
  ж: 'zh',
  з: 'z',
  и: 'y',
  і: 'i',
  ї: 'i',
  й: 'i',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'kh',
  ц: 'ts',
  ч: 'ch',
  ш: 'sh',
  щ: 'shch',
  ю: 'iu',
  я: 'ia',
  ь: '',
};

/**
 * Transliterates a given text from Cyrillic to Latin characters based on a predefined mapping.
 *
 * Each character in the input text is replaced with its corresponding Latin character as defined in the TRANSLITERATIONS_CONFIG.
 * If a character does not have a mapping, it is returned unchanged.
 *
 * @param {string} text - The input text to be transliterated.
 * @returns {string} The transliterated version of the input text.
 */
export const transliterateText = (text: string): string =>
  text
    .toLowerCase()
    .split('')
    .map(
      (char: string) =>
        TRANSLITERATIONS_CONFIG[char as keyof typeof TRANSLITERATIONS_CONFIG] ??
        char,
    )
    .join('');
