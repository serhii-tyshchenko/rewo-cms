import { isEmpty } from 'lodash-es';

export const prepareMetaData = (
  data: Record<string, string | undefined>,
): Record<string, string> => {
  const keys = Object.keys(data);
  return keys.reduce((acc, key) => {
    const value = data[key];
    if (isEmpty(value)) return acc;
    return {
      ...acc,
      [key]: value,
    };
  }, {});
};
