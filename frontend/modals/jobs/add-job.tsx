'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createJobSchema, CreateJobInput } from '@/schemas/job';
import FormInput from '@/components/reusable/form-input';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useCreateJobMutation } from '@/services/mutations/job.mutation';
import useModalContext from '@/hooks/usemodal';
// import { QueryClient } from '@tanstack/react-query';
// import { toast } from 'react-toastify';

export default function CreateJobForm() {
  const { closeModal } = useModalContext();
  const { mutate: AddJob, isPaused } = useCreateJobMutation();

  const form = useForm({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      title: '',
      description: '',
      position: '',
      location: '',
      experience: '',
      salaryMin: 0,
      salaryMax: 0,
      type: undefined,
      deadline: '',
      companyId: 0,
      categoryId: 0,
    },
  });

  const onSubmit = async (data: CreateJobInput) => {
    await AddJob(data, {
      onSuccess: () => {
        closeModal('ADD_JOB');
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full mx-auto bg-card border border-border p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Create Job</h2>

        <FormInput
          form={form}
          name="title"
          label="Job Title"
          placeholder="Enter job title"
          required
        />

        <FormInput
          form={form}
          name="description"
          label="Description"
          placeholder="Enter job description"
          required
        />

        <FormInput
          form={form}
          name="position"
          label="Position"
          placeholder="Enter job position"
          required
        />

        <FormInput
          form={form}
          name="location"
          label="Location"
          placeholder="Enter job location"
        />

        <FormInput
          form={form}
          name="experience"
          label="Experience"
          placeholder="Enter required experience"
          required
        />

        <FormInput
          form={form}
          name="salaryMin"
          label="Minimum Salary"
          placeholder="Enter minimum salary"
          type="number"
          required
        />

        <FormInput
          form={form}
          name="salaryMax"
          label="Maximum Salary"
          placeholder="Enter maximum salary"
          type="number"
          required
        />

        <FormInput
          form={form}
          name="type"
          label="Job Type"
          placeholder="Full-time / Part-time"
        />

        <FormInput
          form={form}
          name="deadline"
          label="Application Deadline"
          placeholder="Select deadline"
          type="date"
        />

        <FormInput
          form={form}
          name="companyId"
          label="Company ID"
          placeholder="Enter company ID"
          type="number"
          required
        />

        <FormInput
          form={form}
          name="categoryId"
          label="Category ID"
          placeholder="Enter category ID"
          type="number"
          required
        />

        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isPaused ? 'Creating...' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}
