'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createCompanySchema,
  CreateCompanyInput,
} from '@/schemas/create-company';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import FormInput from '@/components/reusable/form-input';
import { useCreateCompanyMutation } from '@/services/mutations/company.mutation';
import { QueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export default function CreateCompanyForm() {
  const { mutate: AddCompany, isPaused } = useCreateCompanyMutation();
  const form = useForm<CreateCompanyInput>({
    resolver: zodResolver(createCompanySchema),
    defaultValues: {
      name: '',
      description: '',
      location: '',
      website: '',
      industry: '',
      companySize: '',
    },
  });

  const onSubmit = async (data: CreateCompanyInput) => {
    const queryClient = new QueryClient();
    await AddCompany(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['company'] });
        toast.success('Company created successfully');
        form.reset();
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || 'Failed to create company'
        );
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full mx-auto bg-card border border-border p-6 rounded-lg shadow-md "
      >
        <h2 className="text-2xl font-bold text-center mb-6">Create Company</h2>

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
        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isPaused ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}
