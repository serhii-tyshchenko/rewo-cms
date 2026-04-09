export const stringifySearchParams = (
  rawData: Record<string, string | number | boolean | undefined | null>,
): Record<string, string> =>
  Object.fromEntries(
    Object.entries(rawData).map(([key, value]) => [key, String(value)]),
  );
