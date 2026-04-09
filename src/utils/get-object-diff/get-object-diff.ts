import { isEqual } from 'lodash-es';

/**
 * Computes the difference between two objects, returning a new object that contains only the properties that have different values.
 * @param current - The current state of the object.
 * @param base - The base state of the object to compare against.
 * @returns An object containing only the properties that have different values between current and base.
 */
export const getObjectDiff = <T extends Record<string, unknown>>(
  current: Partial<T>,
  base: Partial<T>,
): Partial<T> =>
  Array.from(Object.keys(base) as (keyof T)[]).reduce((acc, key) => {
    if (!isEqual(current[key], base[key])) {
      acc[key] = current[key];
    }
    return acc;
  }, {} as Partial<T>);
