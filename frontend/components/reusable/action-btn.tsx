"use client"
import { Pencil, Trash } from 'lucide-react';
import { Button } from '../ui/button';
import { TModalKeys } from '../../modals/data';
import useModalContext from '@/hooks/usemodal';
import { useRouter } from 'next/router';


type TActionButton<T> = {
  row: T;
  edit?: {
    key: TModalKeys;
    onPageUrl?: string;
  };
  delete?: {
    type?: TDeleteItem['type'];
  };
};

// export function ActionButton<T extends { id: string }>({
//   row,
//   edit,
//   delete: deleteProps,
// }: TActionButton<T>) {
//   const { openModal } = useModalContext();
//   const navigate = useNavigate();
//   return (
//     <div className="flex gap-2">
//       <Button
//         size="sm"
//         variant="secondary"
//         className="text-white"
//         onClick={() => {
//           if (edit.onPageUrl) {
//             navigate(`${edit.onPageUrl}/${row.id}`);
//           } else {
//             openModal({
//               key: edit.key,
//               initiatorName: row.id,
//               data: row,
//             });
//           }
//         }}
//       >
//         <Pencil />
//       </Button>
//       <Button
//         size="sm"
//         variant="destructive"
//         onClick={() =>
//           openModal({
//             key: "DELETE_ITEM",
//             initiatorName: row.id,
//             data: { type: deleteProps.type },
//           })
//         }
//       >
//         <Trash />
//       </Button>
//     </div>
//   );
// }
export function ActionButton<T extends { id: string }>({
  row,
  edit,
  delete: deleteProps,
}: TActionButton<T>) {
  const { openModal } = useModalContext();
  const router= useRouter();

  return (
    <div className="flex gap-2">
      {edit && (
        <Button
          size="sm"
          variant="secondary"
          className="text-white"
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
          <Pencil />
        </Button>
      )}

      {/* ✅ Render Delete button only if deleteProps exists */}
      {deleteProps && (
        <Button
          size="sm"
          variant="destructive"
          onClick={() =>
            openModal({
              key: 'DELETE_ITEM',
              initiatorName: row.id,
              data: { type: deleteProps.type },
            })
          }
        >
          <Trash />
        </Button>
      )}
    </div>
  );
}
