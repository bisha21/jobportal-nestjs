'use client';

import LoginForm from '@/components/login';
import RegistrationForm from '@/components/register';
import { ModalType } from '@/types/modal.types';

type TModalData = {
  [key in TModalKeys]: {
    title: string;
    component: React.FC<ModalType<key>>;
  };
};

export type TModalKeys =
  | 'SIGNUP_MODAL'
  | 'LOGIN_MODAL'
  | 'FORGOT_PASSWORD_MODAL'
  | 'RESET_PASSWORD_MODAL';

export const ModalData: TModalData = {
  SIGNUP_MODAL: {
    title: 'SIGN_UP',
    component: RegistrationForm,
  },
  LOGIN_MODAL: {
    title: 'LOGIN',
    component: LoginForm,
  },
};
