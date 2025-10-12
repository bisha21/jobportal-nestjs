import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '../api'; // your existing apiRequest
import useModalContext from '@/hooks/usemodal';
import { toast } from 'react-toastify';

export type TDeleteItem = {
  initiatorName: string; // usually id
  type: 'job' | 'company' | 'application'; // extendable
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModalContext();

  const deleteMutation = useMutation({
    mutationFn: async ({ type, id }: { type: string; id: number }) => {
      return await apiRequest(`${type}/${id}`, {
        method: 'DELETE',
      });
    },
    
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [variables.type] });
      closeModal('DELETE_ITEM');
      toast.success(`${capitalize(variables.type)} deleted successfully`);
    },
    onError: (error) => {
      console.error(error);
      toast.error(`Deletion failed`);
    },
  });

  const deleteHandler = ({ initiatorName, type }: TDeleteItem) => {
    if (!type || !initiatorName) return;
    deleteMutation.mutate({ type, id: initiatorName });
  };

  return deleteHandler;
};

// Utility to capitalize first letter
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
