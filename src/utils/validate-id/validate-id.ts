/**
 * Validates whether a given ID is a positive number.
 *
 * @param {number} id - The ID to be validated.
 * @returns {boolean} True if the ID is a positive number, otherwise false.
 */
export const validateId = (id: number): boolean => Number(id) > 0; // O(1)
