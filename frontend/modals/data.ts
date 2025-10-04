'use client';

import { ProfileUploadForm, ResumeUploadForm } from '@/components/filehandling';
import LoginForm from '@/components/login';
import RegistrationForm from '@/components/register';
import { ModalType } from '@/types/modal.types';
import ProfileUpdateForm from './profile/editprofile';

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
  | 'RESET_PASSWORD_MODAL'
  | 'UPLOAD_RESUME_MODAL'
  | 'UPLOAD_PROFILE_MODAL'
  | 'UPDATE_PROFILE_MODAL';

export const ModalData: TModalData = {
  SIGNUP_MODAL: {
    title: 'SIGN_UP',
    component: RegistrationForm,
  },
  LOGIN_MODAL: {
    title: 'LOGIN',
    component: LoginForm,
  },
  UPLOAD_PROFILE_MODAL: {
    title: 'UPLOAD_PROFILE_MODAL',
    component: ProfileUploadForm,
  },
  UPLOAD_RESUME_MODAL: {
    title: 'UPLOAD_RESUME_MODAL',
    component: ResumeUploadForm,
  },
  UPDATE_PROFILE_MODAL: {
    title: 'UPDATE_PROFILE_MODAL',
    component: ProfileUpdateForm,
  },
};
