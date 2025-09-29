"use client"

import { ModalType } from "@/types/modal.types";
import Helloworld from "@/types/test";

type TModalData = {
  [key in TModalKeys]: {
    title: string;
    component: React.FC<ModalType<key>>;
  };
};

export type TModalKeys =
  | 'Hello'

export const ModalData: TModalData = {
  Hello:{
    title: 'Hello World',
    component: Helloworld
  }
};
