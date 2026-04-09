/**
 * Recursively removes empty properties from an object. Empty properties include:
 * - null
 * - undefined
 * - empty strings
 * - empty arrays
 * - empty objects (after cleaning)
 *
 * @param {Object} object - The object to be cleaned.
 * @returns {Object} The cleaned object with empty properties removed.
 */
export const cleanObject = (object) => {
  Object.entries(object).forEach(([k, v]) => {
    if (v && typeof v === 'object') cleanObject(v);
    if (
      (v && typeof v === 'object' && !Object.keys(v).length) ||
      v === null ||
      v === undefined ||
      v.length === 0
    ) {
      if (Array.isArray(object)) object.splice(k, 1);
      else if (!(v instanceof Date))
        // eslint-disable-next-line no-param-reassign
        delete object[k];
    }
  });
  return object;
};
