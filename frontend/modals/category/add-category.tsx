'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import FormInput from '@/components/reusable/form-input';
import {
  categorySchema,
  type createCategoryInput,
} from '@/schemas/category';
import useModalContext from '@/hooks/usemodal';
import { useCreateCategoryMutation } from '@/services/mutations/category.mutation.';

export default function CreateCategoryForm() {
  const { closeModal } = useModalContext();
  const { mutate: AddCategory, isPending } = useCreateCategoryMutation();

  const form = useForm<createCategoryInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      categoryName: '',
    },
  });

  const onSubmit = async (data: createCategoryInput) => {
    await AddCategory(data, {
      onSuccess: () => {
        closeModal('ADD_CATEGORY');
        form.reset();
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full mx-auto  border border-border  rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Create Category</h2>

        <FormInput
          form={form}
          name="categoryName"
          label="Category Name"
          placeholder="Enter category name"
          required
        />

        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}
