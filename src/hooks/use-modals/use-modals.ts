import { useState } from 'react';

const useModals = <T extends string>(
  initialState: T | undefined = undefined,
) => {
  const [modal, setModal] = useState<T | undefined>(initialState);
  const openModal = (modalName: T) => setModal(modalName);
  const closeModal = () => setModal(undefined);

  return { modal, openModal, closeModal };
};

export default useModals;
