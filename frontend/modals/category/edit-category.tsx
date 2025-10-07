'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import FormInput from '@/components/reusable/form-input';
import { categorySchema, type createCategoryInput } from '@/schemas/category';
import useModalContext from '@/hooks/usemodal';
import { ModalType } from '@/types/modal.types';
import { useUpdateCategoryMutation } from '@/services/mutations/category.mutation.';

function EditCategory({ initiatorName, data }: ModalType<'EDIT_CATEGORY'>) {
  const { closeModal } = useModalContext();
  const { mutate: UpdateCategory, isPending } = useUpdateCategoryMutation();

  // Initialize form with existing data
  const form = useForm<createCategoryInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      categoryName: data?.categoryName || '',
    },
  });

  const onSubmit = async (values: createCategoryInput) => {
    await UpdateCategory(
      { id: initiatorName, data: values },
      {
        onSuccess: () => {
          closeModal('EDIT_CATEGORY');
          form.reset();
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full mx-auto bg-card border border-border p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Edit Category</h2>

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
          {isPending ? 'Updating...' : 'Update'}
        </Button>
      </form>
    </Form>
  );
}

export default EditCategory;
