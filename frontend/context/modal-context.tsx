"use client"
import { createContext, useState } from 'react';
import { TModalKeys } from '../modals/data';

type TModalState = {
  [key in TModalKeys]: {
    open: boolean;
    initiatorName?: string;
    data?: any;
  };
};
type TModalContext = {
  modals: TModalState;
  openModal: ({
    key,
    initiatorName,
    data,
  }: {
    key: TModalKeys;
    initiatorName?: string;
    data?: any;
  }) => void;
  closeModal: (key: TModalKeys) => void;
};

export const ModalContext = createContext<TModalContext | null>(null);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modals, setModals] = useState<TModalState>({} as TModalState);

  const openModal = ({
    key,
    initiatorName,
    data,
  }: {
    key: TModalKeys;
    initiatorName?: string;
    data?: any;
  }) => {
    setModals((prev) => ({
      ...prev,
      [key]: {
        open: true,
        initiatorName,
        data,
      },
    }));
  };

  const closeModal = (key: TModalKeys) => {
    setModals((prev) => ({
      ...prev,
      [key]: {
        open: false,
        initiatorName: undefined,
        data: undefined,
      },
    }));
  };
  return (
    <ModalContext.Provider value={{ modals, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
