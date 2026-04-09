import { useIsFetching, useIsMutating } from 'react-query';
import { useSelector } from 'react-redux';

import { selectAPILoading } from '@store/selectors';

const useApiLoading = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const isApiLoading =
    useSelector(selectAPILoading) || isFetching > 0 || isMutating > 0;

  return isApiLoading;
};

export { useApiLoading };
