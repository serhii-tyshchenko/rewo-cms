/**
 * Generates sorting configuration options based on an array of field names.
 *
 * For each field, it creates two sorting options: one for ascending order and one for descending order.
 *
 * @param {string[]} fields - An array of field names to generate sorting options for.
 * @returns {string[]} An array of sorting options in the format 'field_asc' and 'field_desc' for each input field.
 */
export const generateSortingConfig = (fields: string[]): string[] =>
  fields.reduce((acc, field) => {
    acc.push(`${field}_asc`, `${field}_desc`);
    return acc;
  }, [] as string[]);
