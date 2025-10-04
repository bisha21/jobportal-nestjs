'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '@/components/reusable/form-input';
import { Button } from '@/components/ui/button';
import { CreateUserInput, createUserSchema } from '@/schemas/register';
import { useUpdateProfile } from '@/services/mutations/auth';
import { useEffect } from 'react';
import { useProfile } from '@/services/query/profile';
import { Form } from '@/components/ui/form';

export default function ProfileUpdateForm() {
  const { data: profile, isLoading } = useProfile();
  const { mutate: updateProfile } = useUpdateProfile();

  const form = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      bio: '',
      password: '',
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        fullName: profile.fullName || '',
        email: profile.email || '',
        phoneNumber: profile.phoneNumber || '',
        bio: profile.bio || '',
      });
    }
  }, [profile, form]);

  const onSubmit = (values: CreateUserInput) => {
    console.log('fommm', form.formState.errors);
    console.log('Form submitted:', values);
    updateProfile(values);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-md"
      >
        <FormInput
          form={form}
          name="fullName"
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          required
        />

        <FormInput
          form={form}
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          required
        />

        <FormInput
          form={form}
          name="phoneNumber"
          label="Phone Number"
          type="text"
          placeholder="Enter your phone number"
          required
        />

        <FormInput
          form={form}
          name="bio"
          label="Bio"
          type="text"
          placeholder="Short bio"
        />

        <Button type="submit">Update .</Button>
      </form>
    </Form>
  );
}
