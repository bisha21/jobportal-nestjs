'use client';

import { Pencil, Trash, MoreHorizontal, MoreVertical } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '../ui/dropdown-menu';
import { TModalKeys } from '../../modals/data';
import useModalContext from '@/hooks/usemodal';
import { useRouter } from 'next/navigation';

type TActionButton<T> = {
  row: T;
  edit?: {
    key: TModalKeys;
    onPageUrl?: string;
  };
  delete?: {
    type?: string;
  };
};

export function ActionButton<T extends { id: number }>({
  row,
  edit,
  delete: deleteProps,
}: TActionButton<T>) {
  const { openModal } = useModalContext();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        {edit && (
          <DropdownMenuItem
            onClick={() => {
              if (edit.onPageUrl) {
                router.push(`${edit.onPageUrl}/${row.id}`);
              } else {
                openModal({
                  key: edit.key,
                  initiatorName: row.id,
                  data: row,
                });
              }
            }}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
        )}

        {deleteProps && (
          <DropdownMenuItem
            onClick={() =>
              openModal({
                key: 'DELETE_ITEM',
                initiatorName: row.id,
                data: { type: deleteProps.type },
              })
            }
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
