const actionsConfig = {
  string: (arg) => arg,
  object: (arg) =>
    Object.keys(arg)
      .filter((key) => arg[key])
      .join(' ')
      .trim(),
  array: (arg) => arg.join(' ').trim(),
};

const typesConfig = {
  string: (arg) => typeof arg === 'string',
  object: (arg) => typeof arg === 'object' && !Array.isArray(arg),
  array: (arg) => Array.isArray(arg),
};

const mapConfigs = (arg) => {
  const argType = Object.keys(typesConfig).find((key) => typesConfig[key](arg));
  return actionsConfig[argType](arg);
};

/**
 * Combines multiple class name arguments into a single string, filtering out falsy values.
 *
 * @param {...(string|object|array)} args - The class name arguments, which can be strings, objects, or arrays.
 * @returns {string} A single string of class names separated by spaces.
 */
export const getClassName = (...args) =>
  args
    .map((arg) => mapConfigs(arg))
    .filter(Boolean)
    .join(' ')
    .trim();
