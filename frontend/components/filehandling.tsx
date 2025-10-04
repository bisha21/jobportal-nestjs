'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/reusable/form-input';
import { Form } from '@/components/ui/form';
import { useUploadProfile, useUploadResume } from '@/services/mutations/auth';
import PageHeader from './reusable/pageheader';

type UploadProfileFormValues = {
  profilePicture: FileList;
};

type UploadResumeFormValues = {
  resume: FileList;
};

export function ProfileUploadForm() {
  const form = useForm<UploadProfileFormValues>({
    defaultValues: { profilePicture: undefined as any },
  });

  const uploadProfileMutation = useUploadProfile();

  const onSubmit = (values: UploadProfileFormValues) => {
    if (values.profilePicture && values.profilePicture.length > 0) {
      const file = values.profilePicture[0];
      uploadProfileMutation.mutate(file);
    }
  };

  return (
    <Form {...form}>
      <PageHeader>Upload Profile Picture</PageHeader>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          form={form}
          name="profilePicture"
          type="file"
          label="Upload Profile Picture"
          required
        />
        <Button type="submit" disabled={uploadProfileMutation.isPending}>
          {uploadProfileMutation.isPending ? 'Uploading...' : 'Upload'}
        </Button>
      </form>
    </Form>
  );
}

export function ResumeUploadForm() {
  const form = useForm<UploadResumeFormValues>({
    defaultValues: { resume: undefined as any },
  });

  const uploadResumeMutation = useUploadResume();

  const onSubmit = (values: UploadResumeFormValues) => {
    if (values.resume && values.resume.length > 0) {
      const file = values.resume[0];
      uploadResumeMutation.mutate(file);
    }
  };

  return (
    <Form {...form}>
      <PageHeader>Upload Resume</PageHeader>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          form={form}
          name="resume"
          type="file"
          label="Upload Resume"
          required
        />
        <Button type="submit" disabled={uploadResumeMutation.isPending}>
          {uploadResumeMutation.isPending ? 'Uploading...' : 'Upload'}
        </Button>
      </form>
    </Form>
  );
}
