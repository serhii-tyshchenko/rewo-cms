import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

const filterEmptyValues = (obj: Record<string, any>) =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => v !== undefined && v !== null && v !== '',
    ),
  );

const useUrlQueryParams = <T extends Record<string, any>>(defaultParams: T) => {
  const [searchParams, setSearchParams] = useSearchParams(
    new URLSearchParams(defaultParams),
  );

  const queryParams = useMemo(
    () => Object.fromEntries([...searchParams]),
    [searchParams],
  );

  const setQueryParams = useCallback(
    (params: Record<string, any>) =>
      setSearchParams(filterEmptyValues({ ...queryParams, ...params })),
    [queryParams, setSearchParams],
  );

  return [queryParams, setQueryParams] as const;
};

export default useUrlQueryParams;
