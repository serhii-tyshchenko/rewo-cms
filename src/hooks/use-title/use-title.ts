import { useEffect } from 'react';

import { APP_NAME } from '@constants';

const useTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title} | ${APP_NAME}`;
  }, [title]);
};

export default useTitle;
