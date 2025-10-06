import { TDeleteItem } from '@/services/mutations/delete-mutatuin';
import { TModalKeys } from '../modals/data';
import { CompanyResponse } from '@/services/query/usecompany.query';
import { Job } from '@/services/query/jobs.query';

export type ModalType<K extends TModalKeys> = {
  initiatorName?: string;
  data?: Partial<TModalDataMap[K]>;
};

export interface TModalDataMap {
  DELETE_ITEM: {
    type: TDeleteItem['type'];
  };
  EDIT_COMPANY: CompanyResponse
  EDIT_JOB: Job
}
