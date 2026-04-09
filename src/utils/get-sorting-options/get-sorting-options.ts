import { TFunction } from 'i18next';

const getDicKeyFromConfigKey = (key: string) =>
  key.split('_').reduce((acc, item, index) => {
    if (index === 0) {
      return item;
    }
    return `${acc}${item.charAt(0).toUpperCase()}${item.slice(1)}`;
  }, '');

/**
 * Generates an array of sorting options with localized labels based on a given configuration array.
 *
 * Each sorting option is an object containing a 'value' (the original config key) and a 'label' (a localized string).
 *
 * @param {TFunction} t - The translation function used to localize the labels.
 * @param {string[]} config - An array of sorting configuration keys (e.g., ['name_asc', 'name_desc']).
 * @returns {Array<{ value: string; label: string }>} An array of sorting options, each with a 'value' and a localized 'label'.
 */
export const getSortingOptions = (
  t: TFunction,
  config: string[],
): Array<{ value: string; label: string }> =>
  config.map((key) => ({
    value: key,
    label: t(`sorting.${getDicKeyFromConfigKey(key)}`) || key,
  }));
