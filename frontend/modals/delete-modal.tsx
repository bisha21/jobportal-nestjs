'use client';

import { Button } from '../components/ui/button';
import { ModalType } from '../types/modal.types';
import useModalContext from '@/hooks/usemodal';
import { useDeleteItem } from '@/services/mutations/delete-mutatuin';
import { Trash2 } from 'lucide-react';

export default function DeleteModal({
  initiatorName,
  data,
}: ModalType<'DELETE_ITEM'>) {
  const { closeModal } = useModalContext();
  const deleteHandler = useDeleteItem();

  return (
    <div className="p-6 w-full bg-white rounded-xl shadow-lg flex flex-col gap-6   ">
      {/* Icon & Title */}
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="bg-red-100 rounded-full p-4">
          <Trash2 className="text-red-600 w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 text-center">
          Confirm Deletion
        </h2>
        <p className="text-sm text-gray-500 text-center">
          Are you sure you want to delete this item? This action cannot be
          undone.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          variant="destructive"
          className="flex-1 flex items-center justify-center gap-2"
          onClick={() =>
            deleteHandler({
              initiatorName: initiatorName || '',
              type: data?.type,
            })
          }
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </Button>

        <Button
          variant="outline"
          className="flex-1"
          onClick={() => closeModal('DELETE_ITEM')}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
