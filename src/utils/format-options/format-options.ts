type TOptionInput = {
  id: string | number;
  name: string;
  description?: string;
};

type TOptionOutput = {
  value: string;
  label: string;
  disabled?: boolean;
  title?: string;
};

const defaultSorter = (a: TOptionInput, b: TOptionInput) =>
  a.name.localeCompare(b.name, undefined, {
    numeric: true,
    sensitivity: 'base',
  });

type TParams = {
  options: TOptionInput[];
  placeholder?: string;
  sorter?: (a: TOptionInput, b: TOptionInput) => number;
  withTitle?: boolean;
};

/**
 * Transforms an array of options into a format suitable for select components.
 *
 * @param {Object} params - The parameters for formatting options.
 * @param {TOptionInput[]} params.options - The array of options to be formatted.
 * @param {string} [params.placeholder] - An optional placeholder to be added as the first option.
 * @param {function} [params.sorter] - An optional sorting function to sort the options. Defaults to sorting by name.
 * @param {boolean} [params.withTitle] - Whether to include the description as a title attribute in the output. Defaults to false.
 * @returns {TOptionOutput[]} An array of formatted options with value, label, and optional title and disabled properties.
 */
export const formatOptions = ({
  options,
  placeholder,
  sorter = defaultSorter,
  withTitle = false,
}: TParams): TOptionOutput[] =>
  options
    ? [
        ...(placeholder
          ? [{ value: '', label: placeholder, disabled: true }]
          : []),
        ...options.sort(sorter).map((option) => ({
          value: String(option.id),
          label: option.name,
          title: withTitle ? option.description : undefined,
        })),
      ]
    : [];
