
import { useState } from 'react';

export const useDevelopmentModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const showDevelopmentModal = () => {
    setIsOpen(true);
  };

  const closeDevelopmentModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    showDevelopmentModal,
    closeDevelopmentModal
  };
};
