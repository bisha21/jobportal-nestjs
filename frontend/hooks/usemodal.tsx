"use client"
import { ModalContext } from '@/context/modal-context';
import { useContext } from 'react';

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};

export default useModalContext;
