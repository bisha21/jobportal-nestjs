'use client';

import { ProfileUploadForm, ResumeUploadForm } from '@/components/filehandling';
import LoginForm from '@/components/login';
import RegistrationForm from '@/components/register';
import { ModalType } from '@/types/modal.types';
import ProfileUpdateForm from './profile/editprofile';
import CreateCompanyForm from './company/add-company';
import DeleteModal from './delete-modal';
import EditCompany from './company/edit-company';
import CreateJobForm from './jobs/add-job';
import EditJob from './jobs/edit-job';
import CreateCategoryForm from './category/add-category';
import EditCategory from './category/edit-category';
import JobSeekerChatPage from '@/components/chat/jobseeker';

type TModalData = {
  [key in TModalKeys]: {
    title: string;
    component: React.FC<ModalType<key>>;
  };
};

export type TModalKeys =
  | 'DELETE_ITEM'
  | 'SIGNUP_MODAL'
  | 'LOGIN_MODAL'
  | 'FORGOT_PASSWORD_MODAL'
  | 'RESET_PASSWORD_MODAL'
  | 'UPLOAD_RESUME_MODAL'
  | 'UPLOAD_PROFILE_MODAL'
  | 'UPDATE_PROFILE_MODAL'
  | 'ADD_COMPANY'
  | 'EDIT_COMPANY'
  | 'ADD_JOB'
  | 'EDIT_JOB'
  | 'ADD_CATEGORY'
  | 'EDIT_CATEGORY'
  |'MESSAGE_MODAL';

export const ModalData: TModalData = {
  DELETE_ITEM: {
    title: 'Delete',
    component: DeleteModal,
  },
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
  ADD_COMPANY: {
    title: 'ADD_COMPANY',
    component: CreateCompanyForm,
  },
  EDIT_COMPANY: {
    title: 'EDIT_COMPANY',
    component: EditCompany,
  },
  ADD_JOB: {
    title: 'ADD_JOB',
    component: CreateJobForm,
  },
  EDIT_JOB: {
    title: 'EDIT_JOB',
    component: EditJob,
  },
  ADD_CATEGORY: {
    title: 'ADD_CATEGORY',
    component: CreateCategoryForm,
  },
  EDIT_CATEGORY: {
    title: 'EDIT_CATEGORY',
    component: EditCategory,
  },
  MESSAGE_MODAL: {
    title: 'MESSAGE_MODAL',
    component: JobSeekerChatPage,
  },
};
