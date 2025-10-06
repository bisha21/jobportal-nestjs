'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ModalType } from '@/types/modal.types';
import {
  createCompanySchema,
  CreateCompanyInput,
} from '@/schemas/create-company';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import FormInput from '@/components/reusable/form-input';
import { useUpdateCompanyMutation } from '@/services/mutations/company.mutation';
import useModalContext from '@/hooks/usemodal';

export default function EditCompany({
  initiatorName,
  data,
}: ModalType<'EDIT_COMPANY'>) {
  console.log('my actual data', data);
  const { closeModal } = useModalContext();
  const { mutate: updateCompany, isPending } = useUpdateCompanyMutation();

  // Default form values from modal data
  const form = useForm<CreateCompanyInput>({
    resolver: zodResolver(createCompanySchema),
    defaultValues: {
      name: data?.name || '',
      description: data?.description || '',
      location: data?.location || '',
      website: data?.website || '',
      industry: data?.industry || '',
      companySize: data?.companySize || '',
    },
  });

  const onSubmit = async (formData: CreateCompanyInput) => {
    await updateCompany(
      { id: initiatorName, data: formData },
      {
        onSuccess: () => {
          closeModal('ADD_COMPANY');

          form.reset();
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full mx-auto bg-card border border-border p-6 rounded-lg shadow-md "
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Edit Company Details
        </h2>

        <FormInput
          form={form}
          name="name"
          label="Company Name"
          placeholder="Enter company name"
          required
        />

        <FormInput
          form={form}
          name="description"
          label="Description"
          placeholder="Enter description"
          required
        />

        <FormInput
          form={form}
          name="location"
          label="Location"
          placeholder="Enter company location"
          required
        />

        <FormInput
          form={form}
          name="website"
          label="Website"
          placeholder="https://example.com"
          type="url"
        />

        <FormInput
          form={form}
          name="industry"
          label="Industry"
          placeholder="e.g., Technology"
          required
        />

        <FormInput
          form={form}
          name="companySize"
          label="Company Size"
          placeholder="e.g., 50-100 employees"
          required
        />

        <div className="flex justify-between mt-6 w-full">
          <Button
            type="submit"
            className="w-1/3 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isPending ? 'Updating...' : 'Update'}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-1/3"
            onClick={() => closeModal('EDIT_COMPANY')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
