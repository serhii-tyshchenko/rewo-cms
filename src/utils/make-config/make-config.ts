/**
 * Creates a configuration function that retrieves values from a given configuration object.
 *
 * @param {Object} config - The configuration object containing key-value pairs and a default value.
 * @returns {function} A function that takes a value and returns the corresponding configuration value or the default if not found.
 */
export const makeConfig =
  <T>(config: Record<string, T> & { default: T }): ((value: string) => T) =>
  (value: string) =>
    config[value] ?? config.default;
