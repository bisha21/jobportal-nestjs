'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createJobSchema, CreateJobInput } from '@/schemas/job';
import FormInput from '@/components/reusable/form-input';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useUpdateJobMutation } from '@/services/mutations/job.mutation';
import { ModalType } from '@/types/modal.types';
import useModalContext from '@/hooks/usemodal';
import FormHeader from '@/components/reusable/form-header';
import { Briefcase } from 'lucide-react';

function EditJob({ initiatorName, data }: ModalType<'EDIT_JOB'>) {
  const { closeModal } = useModalContext();
  const { mutate: UpdateJob, isPending } = useUpdateJobMutation();

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

  // Pre-fill existing job data
  useEffect(() => {
    if (data) {
      form.reset({
        title: data.title || '',
        description: data.description || '',
        position: data.position || '',
        location: data.location || '',
        experience: data.experience || '',
        salaryMin: data.salaryMin,
        salaryMax: data.salaryMax,
        type: data.type || '',
        deadline: data.deadline
          ? new Date(data.deadline).toISOString().split('T')[0]
          : '',
        companyId: data.companyId ,
        categoryId: data.categoryId,
      });
    }
  }, [data, form]);

  const onSubmit = async (values: CreateJobInput) => {
    if (!data?.id) return;
    UpdateJob(
      { id: initiatorName, data:values},
      {
        onSuccess: () => {
          form.reset();
          closeModal('EDIT_JOB');
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
        <FormHeader
          title="Update Job"
          icon={Briefcase}
          subtitle="Update job details"
        />

        <FormInput form={form} name="title" label="Job Title" required />
        <FormInput
          form={form}
          name="description"
          label="Description"
          required
        />
        <FormInput form={form} name="position" label="Position" required />
        <FormInput form={form} name="location" label="Location" />
        <FormInput form={form} name="experience" label="Experience" required />
        <FormInput
          form={form}
          name="salaryMin"
          label="Minimum Salary"
          type="number"
          required
        />
        <FormInput
          form={form}
          name="salaryMax"
          label="Maximum Salary"
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
          type="date"
        />
        <FormInput
          form={form}
          name="companyId"
          label="Company ID"
          type="number"
          required
        />
        <FormInput
          form={form}
          name="categoryId"
          label="Category ID"
          type="number"
          required
        />

        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isPending ? 'Updating...' : 'Update Job'}
        </Button>
      </form>
    </Form>
  );
}

export default EditJob;
