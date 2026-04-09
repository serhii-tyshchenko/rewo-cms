import { useState } from 'react';

const useStateWithReset = <T>(initialValue: T) => {
  const [state, setState] = useState(initialValue);

  const reset = () => setState(initialValue);

  return [state, setState, reset] as const;
};

export default useStateWithReset;
