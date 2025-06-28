
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DevelopmentModal from '@/components/DevelopmentModal';
import { useDevelopmentModal } from '@/hooks/useDevelopmentModal';

const Hub = () => {
  const navigate = useNavigate();
  const { isOpen, showDevelopmentModal, closeDevelopmentModal } = useDevelopmentModal();

  useEffect(() => {
    // Mostrar modal imediatamente ao acessar a página
    showDevelopmentModal();
  }, [showDevelopmentModal]);

  const handleModalClose = () => {
    closeDevelopmentModal();
    // Redirecionar para a página inicial após fechar o modal
    navigate('/');
  };

  return (
    <DevelopmentModal 
      isOpen={isOpen} 
      onClose={handleModalClose} 
    />
  );
};

export default Hub;
