"use client"
import useModalContext from '@/hooks/usemodal';
import { ModalData, TModalKeys } from './data';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export default function ModalX() {
  const { modals, closeModal } = useModalContext();

  return (
    <div>
      {Object.entries(modals).map(([key, modal]) => {
        if (!modal.open) return null;
        const ModalComponent =
          ModalData[key as keyof typeof ModalData].component;
        if (!ModalComponent) return null;
        return (
          <Dialog
            key={key}
            open={modal.open}
            onOpenChange={() => closeModal(key as TModalKeys)}
          >
            <DialogContent>
              <ModalComponent
                initiatorName={modal.initiatorName}
                data={modal.data}
              />
            </DialogContent>
          </Dialog>
        );
      })}
    </div>
  );
}
