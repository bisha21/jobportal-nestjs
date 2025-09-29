// import { TDeleteItem } from '../api/mutations/delete.mutation';
import { TModalKeys } from '../modals/data';
// import { TBookingsResponse, TRoomResponse } from './response.types';

export type ModalType<K extends TModalKeys> = {
  initiatorName?: string;
  data?: Partial<TModalDataMap[K]>;
};

export interface TModalDataMap {
//   DELETE_ITEM: {};



}
