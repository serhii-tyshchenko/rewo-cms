import { useCallback, useEffect, useState } from 'react';

import { isEnterPressed } from '@utils';

const useFindAndReplace = (onConfirm, selectedText) => {
  const [formValues, setFormValues] = useState({
    find: '',
    replace: '',
  });

  useEffect(() => {
    setFormValues((prev) => ({ ...prev, find: selectedText }));
  }, [selectedText]);

  const onFormChange = (e) =>
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleConfirm = () => onConfirm(formValues);

  const handleKeyDown = useCallback(
    (e) => (isEnterPressed(e) ? handleConfirm() : null),
    [handleConfirm]
  );

  return {
    formValues,
    onFormChange,
    handleConfirm,
    handleKeyDown,
  };
};

export default useFindAndReplace;
